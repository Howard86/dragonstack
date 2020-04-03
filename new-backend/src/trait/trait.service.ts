import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Trait } from './trait.entity';
import TRAITS from './trait.constant';

@Injectable()
export class TraitService {
  constructor(
    @InjectRepository(Trait)
    private readonly traitRepository: Repository<Trait>,
  ) {}

  init(): void {
    TRAITS.forEach(TRAIT => {
      const { type, values } = TRAIT;
      values.forEach(value => {
        const trait = new Trait();
        trait.traitType = type;
        trait.traitValue = value;
        this.traitRepository.save(trait);
      });
    });
  }

  count(): Promise<number> {
    return this.traitRepository.count();
  }

  async getId(traitType: string, traitValue: string): Promise<number> {
    const trait = await this.traitRepository.findOne({ traitType, traitValue });

    return trait.id;
  }

  find(traitType: string, traitValue: string): Promise<Trait> {
    return this.traitRepository.findOne({ traitType, traitValue });
  }

  mixTrait(matronTrait: Trait, patronTrait: Trait): Trait {
    // TODO: update algorithm
    return Math.random() > 0.5 ? matronTrait : patronTrait;
  }
}
