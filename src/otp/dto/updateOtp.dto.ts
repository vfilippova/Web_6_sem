import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateOtpDto {
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

  @IsString()
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
