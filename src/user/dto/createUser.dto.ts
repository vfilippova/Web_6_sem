import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
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


  constructor(email: string, password: string, username: string) {
    this.email = email;
    this.password = password;
    this.username = username;
  }
}
