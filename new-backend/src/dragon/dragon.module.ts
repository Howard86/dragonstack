import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GenerationModule } from 'src/generation/generation.module';
import { AccountModule } from 'src/account/account.module';
import { TraitModule } from 'src/trait/trait.module';
import { AuthModule } from 'src/auth/auth.module';
import { Trait } from 'src/trait/trait.entity';
import { Account } from 'src/account/account.entity';

import { Dragon } from './dragon.entity';
import { DragonService } from './dragon.service';
import { DragonController } from './dragon.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Dragon, Trait, Account]),
    TraitModule,
    AccountModule,
    GenerationModule,
    AuthModule,
  ],
  providers: [DragonService],
  controllers: [DragonController],
  exports: [DragonService],
})
export class DragonModule {}
