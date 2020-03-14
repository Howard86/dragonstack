import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  BeforeInsert,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Dragon } from '../dragon/dragon.entity';
import * as crypto from 'crypto';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @BeforeInsert()
  hashPassword() {
    this.password = crypto.createHmac('sha256', this.password).digest('hex');
  }

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
