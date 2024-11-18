import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateProductDto } from './dto/createProduct.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      return await this.prisma.product.create({
        data: {
          createdAt: new Date(),
          description: createProductDto.description,
          name: createProductDto.name,
          price: createProductDto.price,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      throw new BadRequestException('Invalid data');
    }
  }

  async getProductById(productId: number): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async findAllProducts(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async updateProduct(id: number, createProductDto: CreateProductDto): Promise<Product> {
    try {
      return await this.prisma.product.update({
        data: {
          description: createProductDto.description,
          name: createProductDto.name,
          price: createProductDto.price,
          updatedAt: new Date(),
        },
        where: {
          id: id,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Product not found');
      }
      throw new BadRequestException('Invalid data');
    }
  }

  async deleteProduct(productId: number): Promise<void> {
    try {
      await this.prisma.product.delete({
        where: {
          id: productId,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Product not found');
      }
      throw new BadRequestException('Invalid data');
    }
  }
}
