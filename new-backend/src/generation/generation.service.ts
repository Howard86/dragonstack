import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Generation } from './generation.entity';
import { Repository } from 'typeorm';
import { CreateGenerationDto } from './dto/create-generation.dto';

@Injectable()
export class GenerationService {
  constructor(
    @InjectRepository(Generation)
    private readonly generationRepository: Repository<Generation>,
  ) {}

  create(createGenerationDto: CreateGenerationDto): Promise<Generation> {
    const generation = new Generation();
    generation.expiration = createGenerationDto.expiration;
    return this.generationRepository.save(generation);
  }

  findOne(): Promise<Generation> {
    return this.generationRepository.findOne();
  }
}
