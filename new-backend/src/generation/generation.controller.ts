import { Controller, Get } from '@nestjs/common';
import { GenerationService } from './generation.service';
import { Generation } from './generation.entity';
import { GenerationEngineService } from './generation-engine.service';
import { TaskService } from '../task/task.service';

@Controller('generation')
export class GenerationController {
  constructor(private readonly generationService: GenerationService) {}

  @Get()
  getGeneration(): Promise<Generation> {
    return this.generationService.getLastGeneration();
  }
}
