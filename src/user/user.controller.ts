import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
} from '@nestjs/common';
import { UsersService } from './user.service';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiOkResponse({ status: 201, description: 'User created successfully' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request' })
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @ApiOperation({ summary: 'Update a user by userId' })
  @ApiOkResponse({ status: 200, description: 'User updated successfully' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Put(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(+userId, updateUserDto);
  }

  @ApiOperation({ summary: 'Get user by userId' })
  @ApiOkResponse({ status: 200, description: 'User found' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Get(':userId')
  async getUserById(@Param('userId') userId: string) {
    return await this.userService.getUserById(+userId);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({
    status: 200,
    description: 'All users retrieved successfully',
  })
  @ApiNotFoundResponse({ description: 'No users found' })
  @Get()
  async findAll() {
    return await this.userService.findAllUsers();
  }

  @ApiOperation({ summary: 'Delete user by userId' })
  @ApiOkResponse({ status: 200, description: 'User deleted successfully' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string): Promise<void> {
    await this.userService.deleteUser(+userId);
  }
}
