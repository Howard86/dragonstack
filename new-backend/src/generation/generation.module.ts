import { Module } from '@nestjs/common';
import { GenerationService } from './generation.service';
import { GenerationController } from './generation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Generation } from './generation.entity';
import { GenerationEngineService } from './generation-engine.service';

@Module({
  imports: [TypeOrmModule.forFeature([Generation])],
  providers: [GenerationService, GenerationEngineService],
  controllers: [GenerationController],
  exports: [GenerationEngineService],
})
export class GenerationModule {}
