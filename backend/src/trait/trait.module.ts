import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Trait } from './trait.entity';
import { TraitService } from './trait.service';

@Module({
  imports: [TypeOrmModule.forFeature([Trait])],
  providers: [TraitService],
  exports: [TraitService],
})
export class TraitModule {}
