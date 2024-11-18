import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Address } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateAddressDto } from './dto/createAddress.dto';

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}

  async create(createAddressDto: CreateAddressDto) {
    try {
      return await this.prisma.address.create({
        data: {
          userId: createAddressDto.userId,
          street: createAddressDto.street,
          city: createAddressDto.city,
          postalCode: createAddressDto.postalCode,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      throw new BadRequestException('Could not create address');
    }
  }

  async getAddressById(addressId: number) {
    const address = await this.prisma.address.findUnique({
      where: { id: addressId },
    });

    if (!address) {
      throw new NotFoundException('Address not found');
    }

    return address;
  }

  async findAllAddresses() {
    return this.prisma.address.findMany();
  }

  async updateAddress(
    id: number,
    createAddressDto: CreateAddressDto,
  ): Promise<Address> {
    try {
      return await this.prisma.address.update({
        data: {
          userId: createAddressDto.userId,
          street: createAddressDto.street,
          city: createAddressDto.city,
          postalCode: createAddressDto.postalCode,
          updatedAt: new Date(),
        },
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException('Invalid data for update');
    }
  }

  async deleteAddress(addressId: number) {
    try {
      await this.prisma.address.delete({
        where: { id: addressId },
      });
    } catch (error) {
      throw new NotFoundException('Address not found');
    }
  }
}
