import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOrderDto } from './dto/orders.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(buyerId: string, createOrderDto: CreateOrderDto) {
    const inventory = await this.prisma.inventory.findUnique({
      where: { id: createOrderDto.inventoryId },
    });

    if (!inventory || inventory.status !== 'ACTIVE') {
      throw new BadRequestException('Inventory not available');
    }

    const { finalPrice, marginAmount } = await this.calculatePricing(
      Number(inventory.basePrice),
      inventory.polymerType,
    );

    return this.prisma.order.create({
      data: {
        buyerId,
        inventoryId: createOrderDto.inventoryId,
        basePrice: inventory.basePrice,
        marginAmount,
        finalPrice,
      },
    });
  }

  async findByBuyer(buyerId: string) {
    return this.prisma.order.findMany({
      where: { buyerId },
      include: {
        inventory: {
          select: {
            polymerType: true,
            grade: true,
            manufacturer: true,
            location: true,
          },
        },
      },
    });
  }

  async findBySeller(sellerId: string) {
    return this.prisma.order.findMany({
      where: {
        inventory: { sellerId },
      },
      select: {
        id: true,
        finalPrice: true,
        orderStatus: true,
        paymentStatus: true,
        createdAt: true,
        inventory: {
          select: {
            polymerType: true,
            grade: true,
            quantity: true,
          },
        },
      },
    });
  }

  private async calculatePricing(basePrice: number, polymerType: string) {
    const margin = await this.prisma.platformMargin.findFirst({
      where: { polymerType, active: true },
    });

    let marginAmount = 0;
    let finalPrice = basePrice;

    if (margin) {
      if (margin.marginType === 'percentage') {
        marginAmount = basePrice * (Number(margin.marginValue) / 100);
      } else {
        marginAmount = Number(margin.marginValue);
      }
      finalPrice = basePrice + marginAmount;
    }

    return { finalPrice, marginAmount };
  }
}