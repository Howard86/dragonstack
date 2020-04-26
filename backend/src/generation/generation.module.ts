import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Generation } from './generation.entity';
import { GenerationService } from './generation.service';
import { GenerationEngineService } from './generation-engine.service';
import { GenerationController } from './generation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Generation])],
  providers: [GenerationService, GenerationEngineService],
  controllers: [GenerationController],
  exports: [GenerationEngineService],
})
export class GenerationModule {}
