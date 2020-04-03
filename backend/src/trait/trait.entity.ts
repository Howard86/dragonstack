import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToMany,
} from 'typeorm';

import { Dragon } from 'src/dragon/dragon.entity';

@Entity()
@Unique(['traitType', 'traitValue'])
export class Trait {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  traitType: string;

  @Column()
  traitValue: string;

  @ManyToMany(
    _type => Dragon,
    dragon => dragon.traits,
  )
  dragons: Dragon[];
}
