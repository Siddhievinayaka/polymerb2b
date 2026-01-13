import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto, InventoryFilterDto } from './dto/inventory.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CurrentUser } from '../auth/current-user.decorator';
import { Role } from '@prisma/client';

@Controller('inventory')
@UseGuards(JwtAuthGuard, RolesGuard)
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  @Get('buyer')
  @Roles(Role.BUYER)
  async findAllForBuyer(@Query() filters: InventoryFilterDto) {
    return this.inventoryService.findAllForBuyer(filters);
  }

  @Post('seller')
  @Roles(Role.SELLER)
  async create(
    @CurrentUser() user: any,
    @Body() createInventoryDto: CreateInventoryDto,
  ) {
    return this.inventoryService.create(user.id, createInventoryDto);
  }

  @Get('seller')
  @Roles(Role.SELLER)
  async findBySeller(@CurrentUser() user: any) {
    return this.inventoryService.findBySeller(user.id);
  }
}