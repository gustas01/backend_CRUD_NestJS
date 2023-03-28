import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'H9@LFztsJ%Bv8otQ2OGsFJP9&e%@caB@'
    }),
    UsersModule,
    PrismaModule
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
