import { Module } from '@nestjs/common';
import { TraitService } from './trait.service';
import { Trait } from './trait.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Trait])],
  providers: [TraitService],
  exports: [TraitService],
})
export class TraitModule {}
