import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'email',
    type: String,
    example: 'wwwvifil261@mail.ru',
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'password',
    type: String,
    example: '1236',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'name',
    type: String,
    example: 'victoria',
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

  constructor(email: string, password: string, username: string) {
    this.email = email;
    this.password = password;
    this.username = username;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
