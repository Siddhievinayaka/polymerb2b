import { Controller, Get, Patch, Param, UseGuards, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateMarginDto, UpdateMarginDto } from './dto/admin.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { NotificationsGateway } from '../../notifications/notifications.gateway';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class AdminController {
  constructor(
    private adminService: AdminService,
    private prisma: PrismaService,
    private notificationsGateway: NotificationsGateway,
  ) {}

  @Get('users/count')
  async getUserCount() {
    const approved = await this.prisma.user.count({ 
      where: { 
        status: 'APPROVED',
        role: { not: 'ADMIN' }
      } 
    });
    const approvedBuyers = await this.prisma.user.count({ 
      where: { 
        status: 'APPROVED',
        role: 'BUYER'
      } 
    });
    const approvedSellers = await this.prisma.user.count({ 
      where: { 
        status: 'APPROVED',
        role: 'SELLER'
      } 
    });
    const rejected = await this.prisma.user.count({ 
      where: { 
        status: 'SUSPENDED',
        role: { not: 'ADMIN' }
      } 
    });
    return { total: approved, buyers: approvedBuyers, sellers: approvedSellers, rejected };
  }

  @Get('pending-users')
  getPendingUsers() {
    return this.prisma.user.findMany({
      where: { status: 'PENDING' },
      select: {
        id: true,
        email: true,
        role: true,
        gst: true,
        pan: true,
        createdAt: true,
      },
    });
  }

  @Patch('approve/:id')
  async approveUser(@Param('id') id: string) {
    const user = await this.prisma.user.update({
      where: { id },
      data: { status: 'APPROVED' },
    });
    
    // Emit real-time status update
    this.notificationsGateway.emitUserStatusUpdate(id, 'APPROVED');
    
    return user;
  }

  @Patch('reject/:id')
  async rejectUser(@Param('id') id: string) {
    const user = await this.prisma.user.update({
      where: { id },
      data: { status: 'SUSPENDED' },
    });
    
    // Emit real-time status update
    this.notificationsGateway.emitUserStatusUpdate(id, 'SUSPENDED');
    
    return { message: 'User rejected successfully', user };
  }

  @Get('users')
  async getAllUsers(@Query('role') role?: string, @Query('status') status?: string) {
    const where: any = {};
    if (role) where.role = role;
    if (status) where.status = status;
    
    return this.prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });
  }

  @Patch('users/:id/suspend')
  async suspendUser(@Param('id') id: string) {
    return this.adminService.suspendUser(id);
  }

  @Get('margins')
  async getAllMargins() {
    return this.adminService.getAllMargins();
  }

  @Get('analytics')
  async getAnalytics() {
    return this.adminService.getAnalytics();
  }
}