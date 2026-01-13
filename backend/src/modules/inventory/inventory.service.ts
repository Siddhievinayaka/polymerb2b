import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateInventoryDto, InventoryFilterDto } from './dto/inventory.dto';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  async create(sellerId: string, createInventoryDto: CreateInventoryDto) {
    return this.prisma.inventory.create({
      data: {
        ...createInventoryDto,
        sellerId,
      },
    });
  }

  async findAllForBuyer(filters: InventoryFilterDto) {
    const where: any = { status: 'ACTIVE' };
    
    if (filters.polymerType) where.polymerType = { contains: filters.polymerType };
    if (filters.grade) where.grade = { contains: filters.grade };
    if (filters.location) where.location = { contains: filters.location };

    const inventory = await this.prisma.inventory.findMany({
      where,
      select: {
        id: true,
        polymerType: true,
        grade: true,
        manufacturer: true,
        quantity: true,
        location: true,
        basePrice: true,
        createdAt: true,
      },
    });

    // Calculate final prices with margins
    const inventoryWithFinalPrices = await Promise.all(
      inventory.map(async (item) => {
        const finalPrice = await this.calculateFinalPrice(Number(item.basePrice), item.polymerType);
        return { ...item, finalPrice };
      })
    );

    return inventoryWithFinalPrices;
  }

  async findBySeller(sellerId: string) {
    return this.prisma.inventory.findMany({
      where: { sellerId },
      include: {
        orders: {
          select: {
            id: true,
            orderStatus: true,
            finalPrice: true,
            createdAt: true,
          },
        },
      },
    });
  }

  private async calculateFinalPrice(basePrice: number, polymerType: string): Promise<number> {
    const margin = await this.prisma.platformMargin.findFirst({
      where: { polymerType, active: true },
    });

    if (!margin) return basePrice;

    if (margin.marginType === 'percentage') {
      return basePrice * (1 + Number(margin.marginValue) / 100);
    } else {
      return basePrice + Number(margin.marginValue);
    }
  }
}