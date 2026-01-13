import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { NotificationsGateway } from '../../notifications/notifications.gateway';
import * as bcrypt from 'bcrypt';
import { RegisterDto, LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private notificationsGateway: NotificationsGateway,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) throw new BadRequestException('User already exists');

    const hashed = await bcrypt.hash(dto.password, 12);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashed,
        role: dto.role,
        gst: dto.gst,
        pan: dto.pan,
        status: dto.role === 'ADMIN' ? 'APPROVED' : 'PENDING',
      },
    });

    // Emit WebSocket event for pending users
    if (user.status === 'PENDING') {
      console.log('Emitting pending user event:', user.email);
      this.notificationsGateway.emitPendingUser({
        id: user.id,
        email: user.email,
        role: user.role,
        gst: user.gst,
        pan: user.pan,
        createdAt: user.createdAt,
      });
    }

    return { message: 'Registration successful. Await admin approval.' };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');
    // Allow all users to login regardless of status
    // if (user.status !== 'APPROVED') throw new UnauthorizedException('Account not approved');

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const token = this.jwt.sign({
      sub: user.id,
      role: user.role,
    });

    return {
      access_token: token,
      role: user.role,
      status: user.status,
    };
  }

  async validateUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return { id: user.id, role: user.role };
  }
}