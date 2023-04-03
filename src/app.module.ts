import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    AuthModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 2
    }),
    FileModule
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }]
})
export class AppModule {}
