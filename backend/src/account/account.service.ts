import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Account } from './account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  create(username: string, password: string): Promise<Account> {
    const account = new Account();
    account.username = username;
    account.password = password;

    return this.accountRepository.save(account);
  }

  findOne(username: string): Promise<Account> {
    return this.accountRepository.findOne({ username });
  }

  async findAll(): Promise<Account[]> {
    return this.accountRepository.find();
  }

  findById(id: number): Promise<Account> {
    return this.accountRepository.findOne(id);
  }

  save(account: Account): Promise<Account> {
    return this.accountRepository.save(account);
  }
}
