import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateOtpDto } from './dto/createOtp.dto';
import { CreateEntityOtp } from './otp.entities';
import { OtpService } from './otp.service';
import { UpdateOtpDto } from './dto/updateOtp.dto';

@ApiTags('otp')
@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @ApiOperation({ summary: 'Create new OTP' })
  @ApiOkResponse({ status: 200, description: 'Successfully created' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request' })
  @Post()
  createOtp(@Body() createOtpDto: CreateOtpDto) {
    return this.otpService.create(createOtpDto);
  }

  @ApiOperation({ summary: 'Update OTP by ID' })
  @ApiOkResponse({ status: 200, description: 'OTP updated successfully' })
  @ApiBadRequestResponse({ status: 400, description: 'Incorrect request arguments' })
  @ApiNotFoundResponse({ description: 'Nonexistent OTP' })
  @Put(':otpId')
  updateOtp(
    @Param('otpId', ParseIntPipe) otpId: number,
    @Body() updateOtpDto: UpdateOtpDto,
  ) {
    return this.otpService.updateOtp(otpId, updateOtpDto);
  }

  @ApiOperation({ summary: 'Get OTP by ID' })
  @ApiOkResponse({
    status: 200,
    description: 'Successfully got',
    type: CreateEntityOtp,
  })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Nonexistent OTP' })
  @Get(':otpId')
  async getOtpById(@Param('otpId', ParseIntPipe) otpId: number) {
    return await this.otpService.getOtpById(otpId);
  }

  @ApiOperation({ summary: 'Get all OTPs' })
  @ApiOkResponse({
    description: 'All OTPs have been found',
    type: [CreateEntityOtp],
  })
  @ApiNotFoundResponse({ description: 'No OTPs in the system' })
  @Get()
  findAll() {
    return this.otpService.findAllOtp();
  }

  @ApiOperation({ summary: 'Delete OTP by ID' })
  @ApiOkResponse({ status: 200, description: 'Successfully deleted' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request' })
  @Delete(':otpId')
  async deleteOtp(@Param('otpId', ParseIntPipe) otpId: number) {
    await this.otpService.deleteOtp(otpId);
  }
}
