import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'userId',
    type: Number,
    example: '332933',
  })
  userId: number;

  @IsNumber()
  @ApiProperty({
    description: 'totalPrice',
    type: Number,
    example: '430',
  })
  totalPrice: number;

  @IsDate()
  @ApiProperty({
    description: 'createdAt',
    type: Date,
    example: new Date(),
  })
  createdAt: Date;

  constructor(userId: number, totalPrice: number) {
    this.userId = userId;
    this.totalPrice = totalPrice;
    this.createdAt = new Date();
  }
}
