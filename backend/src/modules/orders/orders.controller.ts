import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/orders.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CurrentUser } from '../auth/current-user.decorator';
import { Role } from '@prisma/client';

@Controller('orders')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post('buyer')
  @Roles(Role.BUYER)
  async create(
    @CurrentUser() user: any,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.ordersService.create(user.id, createOrderDto);
  }

  @Get('buyer')
  @Roles(Role.BUYER)
  async findByBuyer(@CurrentUser() user: any) {
    return this.ordersService.findByBuyer(user.id);
  }

  @Get('seller')
  @Roles(Role.SELLER)
  async findBySeller(@CurrentUser() user: any) {
    return this.ordersService.findBySeller(user.id);
  }
}