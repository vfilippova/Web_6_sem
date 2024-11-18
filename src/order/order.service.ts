import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Order } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateOrderDto } from './dto/createOrder.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    return this.prisma.order.create({
      data: {
        userId: createOrderDto.userId,
        totalPrice: createOrderDto.totalPrice,
        createdAt: new Date(),
      },
    });
  }

  async getOrderById(orderId: number) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async findAllOrders() {
    return this.prisma.order.findMany();
  }

  async updateOrder(id: number, createOrderDto: CreateOrderDto) {
    const order = await this.prisma.order.findUnique({
      where: { id: id },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return this.prisma.order.update({
      data: {
        userId: createOrderDto.userId,
        totalPrice: createOrderDto.totalPrice,
        createdAt: new Date(),
      },
      where: {
        id: id,
      },
    });
  }

  async deleteOrder(orderId: number) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    await this.prisma.order.delete({
      where: {
        id: orderId,
      },
    });
  }
}
