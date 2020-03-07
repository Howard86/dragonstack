import { Controller, Get } from '@nestjs/common';
import { GenerationService } from './generation.service';
import { Generation } from './generation.entity';

@Controller('generation')
export class GenerationController {
  constructor(private readonly generationService: GenerationService) {}

  @Get()
  getGeneration(): Promise<Generation> {
    return this.generationService.findOne();
  }
}
