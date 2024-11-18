import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
// import { APP_INTERCEPTOR } from '@nestjs/core';
import { TimingInterceptor } from './interceptor';
import { UsersModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { OtpModule } from './otp/otp.module';
import { OrderModule } from './order/order.module';
import { AddressModule } from './address/address.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'views'),
    }),
    UsersModule,
    ProductModule,
    OtpModule,
    OrderModule,
    AddressModule,
  ],
  controllers: [AppController],
  providers: [AppService, TimingInterceptor, PrismaService],
})
export class AppModule {}
