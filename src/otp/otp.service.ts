import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateOtpDto } from './dto/createOtp.dto';

@Injectable()
export class OtpService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOtpDto: CreateOtpDto) {
    try {
      return await this.prisma.orderToProduct.create({
        data: {
          orderId: createOtpDto.orderId,
          productId: createOtpDto.productId,
          productOrderPrice: createOtpDto.price,
        },
      });
    } catch (error) {
      throw new BadRequestException('Invalid data');
    }
  }

  async getOtpById(otpId: number) {
    const orderToProduct = await this.prisma.orderToProduct.findFirst({
      where: { orderId: otpId },
    });

    if (!orderToProduct) {
      throw new NotFoundException('Nonexistent OTP');
    }

    return orderToProduct;
  }

  async findAllOtp() {
    return this.prisma.orderToProduct.findMany();
  }

  async updateOtp(id: number, createOtpDto: CreateOtpDto) {
    try {
      return this.prisma.orderToProduct.updateMany({
        data: {
          orderId: createOtpDto.orderId,
          productId: createOtpDto.productId,
          productOrderPrice: createOtpDto.price,
        },
        where: {
          orderId: id,
        },
      });
    } catch (error) {
      throw new BadRequestException('invalid data');
    }
  }

  async deleteOtp(otpId: number): Promise<void> {
    const deleteResult = await this.prisma.orderToProduct.deleteMany({
      where: { orderId: otpId },
    });

    if (!deleteResult) {
      throw new NotFoundException('Nonexistent OTP');
    }
  }
}
