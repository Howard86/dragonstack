import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigService } from './config/config.service';
import { AccountModule } from './account/account.module';
import { GenerationModule } from './generation/generation.module';
import { DragonModule } from './dragon/dragon.module';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(new ConfigService(process.env).getTypeOrmConfig()),
    ScheduleModule.forRoot(),
    AccountModule,
    GenerationModule,
    DragonModule,
    TaskModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
