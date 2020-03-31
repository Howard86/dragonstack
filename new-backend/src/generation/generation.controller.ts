import { Controller, Get, UseGuards } from '@nestjs/common';
import { GenerationService } from './generation.service';
import { Generation } from './generation.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('generation')
export class GenerationController {
  constructor(private readonly generationService: GenerationService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getGeneration(): Promise<Generation> {
    return this.generationService.getLastGeneration();
  }
}
