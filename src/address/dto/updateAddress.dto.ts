import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateAddressDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'userId',
    type: Number,
    example: '332893',
  })
  userId: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'street',
    type: String,
    example: 'Kronverkskii,29',
  })
  street: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'city',
    type: String,
    example: 'Russia',
  })
  city: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'postalCode',
    type: Number,
    example: '949339',
  })
  postalCode: number;

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

  constructor(
    userId: number,
    street: string,
    city: string,
    postalCode: number,
  ) {
    this.userId = userId;
    this.street = street;
    this.city = city;
    this.postalCode = postalCode;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
