import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { jwtConstants } from './constants';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/account/account.entity';
import { Repository } from 'typeorm';

interface AuthCookies {
  name: string;
  value: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly jwtService: JwtService,
  ) {}

  async validateLocal(username: string, password: string): Promise<Account> {
    const account = await this.accountRepository.findOneOrFail({ username });
    if (account && account.password === password) {
      return account;
    }
    return undefined;
  }

  async validateJwt(jwt: string): Promise<Account> {
    const { username, iat, exp } = this.jwtService.verify(jwt);

    if (Date.now() < exp || jwtConstants.expiresIn !== exp - iat) {
      return undefined;
    }

    const account = await this.accountRepository.findOneOrFail({ username });

    if (account && account.username === username) {
      return account;
    }
    return undefined;
  }

  // async login(username: string, password: string): Promise<AuthCookies[]> {
  //   const account = await this.validateLocal(username, password);
  //   console.log('account', account);
  //   if (account) {
  //   }
  //   return undefined;
  // }

  generateJwt(account: Account): AuthCookies[] {
    const { username, id } = account;
    const payload = { username, sub: id };
    const jwt = this.jwtService.sign(payload);
    const cookies = [
      {
        name: 'jwt',
        value: jwt,
      },
    ];
    return cookies;
  }

  decodeCookies(cookies: { jwt: string }): Promise<Account> {
    const { jwt } = cookies;
    return this.validateJwt(jwt);
  }

  verify(jwt: string) {}
}
