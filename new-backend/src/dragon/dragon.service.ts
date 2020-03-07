import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dragon } from './dragon.entity';
import { Repository } from 'typeorm';
import { CreateDragonDto } from './dto/create-dragon.dto';
import { UpdateDragonDto } from './dto/update-dragon.dto';
import { TraitService } from '../trait/trait.service';
import { GenerationEngineService } from '../generation/generation-engine.service';

@Injectable()
export class DragonService {
  constructor(
    @InjectRepository(Dragon)
    private readonly dragonRepository: Repository<Dragon>,

    private readonly generationEngineService: GenerationEngineService,
    private readonly traitService: TraitService,
  ) {}

  async create(createDragonDto: CreateDragonDto): Promise<Dragon> {
    const dragon = new Dragon();
    dragon.birthdate = createDragonDto.birthdate;
    dragon.nickname = createDragonDto.nickname;
    dragon.isPublic = createDragonDto.isPublic;
    dragon.traits = await Promise.all(
      createDragonDto.traits.map(
        async ({ traitType, traitValue }) =>
          await this.traitService.find(traitType, traitValue),
      ),
    );

    dragon.generation = this.generationEngineService.generation;

    return this.dragonRepository.save(dragon);
  }

  findOne(dragonId: number): Promise<Dragon> {
    return this.dragonRepository.findOne(dragonId);
  }

  async update(updateDragonDto: UpdateDragonDto): Promise<void> {
    const { id, ...updatedValues } = updateDragonDto;

    await this.dragonRepository.update(id, updatedValues);
  }

  async getPublicDragons(): Promise<Dragon[]> {
    return this.dragonRepository.find({ isPublic: true });
  }
}
