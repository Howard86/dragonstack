import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Generation } from 'src/generation/generation.entity';
import { Trait } from 'src/trait/trait.entity';
import { Account } from 'src/account/account.entity';

@Entity()
export class Dragon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamptz')
  birthdate: Date;

  @Column()
  nickname: string;

  @Column({ default: false })
  isPublic: boolean;

  @Column({ type: 'int', default: 0 })
  saleValue: number;

  @Column({ type: 'int', default: 0 })
  sireValue: number;

  @ManyToOne(
    _type => Generation,
    generation => generation.dragons,
  )
  generation: Generation;

  @ManyToMany(
    _type => Trait,
    trait => trait.dragons,
    { eager: true },
  )
  @JoinTable()
  traits: Trait[];

  @ManyToMany(
    _type => Account,
    account => account.dragons,
  )
  accounts: Account[];
}
