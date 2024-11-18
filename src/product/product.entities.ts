import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateEntityProduct {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'name',
    type: String,
    example: 'americano',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'description',
    type: String,
    example: 'size: s m l',
  })
  description: string;

  @IsNumber()
  @ApiProperty({
    description: 'price',
    type: Number,
    example: '130',
  })
  price: number;

  @IsDate()
  @ApiProperty({
    description: 'createdAt',
    type: Date,
    example: new Date(),
  })
  createdAt: Date;

  @IsDate()
  @ApiProperty({
    description: 'updatedAt',
    type: Date,
    example: new Date(),
  })
  updatedAt: Date;

  constructor(name: string, description: string, price: number) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
