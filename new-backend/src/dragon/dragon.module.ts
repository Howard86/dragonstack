import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Dragon } from './dragon.entity';
import { Trait } from 'src/trait/trait.entity';
import { Account } from '../account/account.entity';

import { DragonService } from './dragon.service';
import { DragonController } from './dragon.controller';
import { TraitModule } from '../trait/trait.module';
import { AccountModule } from '../account/account.module';
import { GenerationModule } from '../generation/generation.module';
import { AuthModule } from '../auth/auth.module';

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
