import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Dragon } from '../dragon/dragon.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude()
  password: string;

  // @Column()
  // sessionId: string;

  @Column({ default: 50 })
  balance: number;

  @ManyToMany(
    type => Dragon,
    dragon => dragon.accounts,
    { eager: true },
  )
  @JoinTable()
  dragons: Dragon[];
}
