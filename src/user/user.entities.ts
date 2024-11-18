import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateEntityUser {
  @IsNumber()
  @ApiProperty({
    description: 'user id',
    type: Number,
    example: 123,
  })
  userid: number;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'email',
    type: String,
    example: 'wwwvifil26@mail.ru',
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'password',
    type: String,
    example: '123',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'name',
    type: String,
    example: 'vika',
  })
  username: string;

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
    userid: number,
    email: string,
    password: string,
    username: string,
  ) {
    this.userid = userid;
    this.email = email;
    this.password = password;
    this.username = username;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
