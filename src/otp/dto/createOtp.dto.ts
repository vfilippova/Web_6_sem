import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOtpDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'orderId',
    type: Number,
    example: '332955',
  })
  orderId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'productId',
    type: Number,
    example: '332956',
  })
  productId: number;

  @IsNumber()
  @ApiProperty({
    description: 'productOrderPrice',
    type: Number,
    example: '130',
  })
  price: number;

  constructor(orderId: number, productId: number, price: number) {
    this.orderId = orderId;
    this.productId = productId;
    this.price = price;
  }
}
