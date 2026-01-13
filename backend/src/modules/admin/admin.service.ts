import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserStatus } from '@prisma/client';
import { CreateMarginDto, UpdateMarginDto } from './dto/admin.dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        gst: true,
        pan: true,
        status: true,
        createdAt: true,
      },
    });
  }

  async approveUser(userId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { status: UserStatus.APPROVED },
    });
  }

  async suspendUser(userId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { status: UserStatus.SUSPENDED },
    });
  }

  async createMargin(createMarginDto: CreateMarginDto) {
    return this.prisma.platformMargin.create({
      data: createMarginDto,
    });
  }

  async updateMargin(id: string, updateMarginDto: UpdateMarginDto) {
    return this.prisma.platformMargin.update({
      where: { id },
      data: updateMarginDto,
    });
  }

  async getAllMargins() {
    return this.prisma.platformMargin.findMany({
      where: { active: true },
    });
  }

  async getAnalytics() {
    const totalUsers = await this.prisma.user.count();
    const totalOrders = await this.prisma.order.count();
    const totalInventory = await this.prisma.inventory.count();
    
    const revenueData = await this.prisma.order.aggregate({
      _sum: { marginAmount: true },
    });

    return {
      totalUsers,
      totalOrders,
      totalInventory,
      totalRevenue: revenueData._sum.marginAmount || 0,
    };
  }
}