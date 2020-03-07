import { Dragon } from '../dragon/dragon.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToMany,
} from 'typeorm';

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
    type => Dragon,
    dragon => dragon.traits,
  )
  dragons: Dragon[];
}
