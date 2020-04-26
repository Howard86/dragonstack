import {
  Controller,
  Post,
  Get,
  Param,
  Request,
  UseInterceptors,
  UseGuards,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { SetCookies, Cookies, ClearCookies } from '@nestjsplus/cookies';

import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Dragon } from 'src/dragon/dragon.entity';

import { AccountService } from './account.service';
import { Account } from './account.entity';

// TODO: Create custom cookie guard
@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly authService: AuthService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  @SetCookies()
  async login(@Request() req) {
    const { username, password } = req.body;
    const account = await this.authService.validateLocal(username, password);

    let jwt = '';
    if (account) {
      const cookies = this.authService.generateJwt(account);
      req._cookies = cookies;
      jwt = cookies[0].value;
    }

    return { ...account, jwt };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signup')
  async create(@Request() req) {
    const { username, password } = req.body;
    const account = await this.accountService.create(username, password);
    const cookies = this.authService.generateJwt(account);
    req._cookies = cookies;
    const jwt = cookies[0].value;
    return { ...account, jwt };
  }

  @ClearCookies('jwt')
  @Get('logout')
  logout() {
    return { ok: true };
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('users')
  findAll(): Promise<Account[]> {
    return this.accountService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('users/:username')
  findOne(@Param('username') username: string): Promise<Account> {
    return this.accountService.findOne(username);
  }

  @UseGuards(JwtAuthGuard)
  @Get('authenticated')
  @UseInterceptors(ClassSerializerInterceptor)
  async authenticated(@Cookies() cookies): Promise<Account> {
    const account = await this.authService.decodeCookies(cookies);
    return account;
  }

  @UseGuards(JwtAuthGuard)
  @Get('dragons')
  async accountDragons(@Cookies() cookies): Promise<{ dragons: Dragon[] }> {
    const { dragons } = await this.authService.decodeCookies(cookies);
    return { dragons };
  }

  @UseGuards(JwtAuthGuard)
  @Get('info')
  @UseInterceptors(ClassSerializerInterceptor)
  async info(@Cookies() cookies) {
    const account = await this.authService.decodeCookies(cookies);
    const { dragons, ...result } = account;
    return result;
  }
}
