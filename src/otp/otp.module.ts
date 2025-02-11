import { Module } from '@nestjs/common';
import { OtpController } from './otp.controller';
import { OtpService } from './otp.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [OtpController],
  providers: [OtpService, PrismaService],
  exports: [OtpService],
})
export class OtpModule {}
