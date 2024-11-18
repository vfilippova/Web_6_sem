import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.prisma.user.create({
        data: {
          email: createUserDto.email,
          password: createUserDto.password,
          name: createUserDto.username,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      throw new BadRequestException('Failed to create user');
    }
  }

  async getUserById(userId: number): Promise<User> {
    const user: User | null = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      return await this.prisma.user.update({
        data: {
          email: updateUserDto.email,
          password: updateUserDto.password,
          name: updateUserDto.username,
          updatedAt: new Date(),
        },
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new BadRequestException('Failed to update user');
    }
  }

  async deleteUser(userId: number): Promise<void> {
    const deleteResult = await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });

    if (!deleteResult) {
      throw new NotFoundException('User not found');
    }
  }
}
