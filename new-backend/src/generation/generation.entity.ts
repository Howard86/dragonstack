import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Dragon } from '../dragon/dragon.entity';

@Entity()
export class Generation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamptz')
  expiration: Date;

  @OneToMany(
    type => Dragon,
    dragon => dragon.generation,
  )
  dragons: Dragon[];
}
