import { Controller, Get, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { Generation } from './generation.entity';
import { GenerationService } from './generation.service';

@Controller('generation')
export class GenerationController {
  constructor(private readonly generationService: GenerationService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getGeneration(): Promise<Generation> {
    return this.generationService.getLastGeneration();
  }
}
