import { Injectable } from '@nestjs/common';

import { Generation } from './generation.entity';
import { GenerationService } from './generation.service';
import { CreateGenerationDto } from './dto/create-generation.dto';

@Injectable()
export class GenerationEngineService {
  accountIds: Set<number>;
  generation: Generation;
  timer: number;

  constructor(private readonly generationService: GenerationService) {}

  async buildGeneration() {
    const generation = new CreateGenerationDto();

    const savedGeneration = await this.generationService.create(generation);

    this.generation = savedGeneration;
    this.timer = this.generation.expiration.getTime() - Date.now();
  }
}
