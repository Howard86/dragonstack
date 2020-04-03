import { Controller, Get, Put, Body, Post, UseGuards } from '@nestjs/common';
import { Cookies } from '@nestjsplus/cookies';

import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateDragonDto } from './dto/create-dragon.dto';
import { UpdateDragonDto } from './dto/update-dragon.dto';
import { DragonService } from './dragon.service';
import { Dragon } from './dragon.entity';
import { AccountService } from '../account/account.service';
import { GenerationEngineService } from '../generation/generation-engine.service';
import { BuyDragonDto } from './dto/buy-dragon.dto';
import { MateDragonDto } from './dto/mate-dragon.dto';

@Controller('dragon')
export class DragonController {
  constructor(
    private readonly dragonService: DragonService,
    private readonly accountService: AccountService,
    private readonly authService: AuthService,
    private readonly generationEngineService: GenerationEngineService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('new')
  async getNewDragon(@Cookies() cookies): Promise<Dragon> {
    const generationId = this.generationEngineService.generation.id;
    const createdDragon = new CreateDragonDto(generationId);
    const dragon = await this.dragonService.create(createdDragon);
    const account = await this.authService.decodeCookies(cookies);
    account.dragons.push(dragon);
    await this.accountService.save(account);

    console.log('dragon', dragon);
    return dragon;
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  async updateDragon(@Body() dragon: UpdateDragonDto) {
    const ok = await this.dragonService.update(dragon);
    return { ok, data: dragon };
  }

  @UseGuards(JwtAuthGuard)
  @Get('public-dragons')
  getPublicDragons() {
    return this.dragonService.getPublicDragons();
  }

  @UseGuards(JwtAuthGuard)
  @Post('buy')
  async buyDragon(@Body() buyParams: BuyDragonDto) {
    const ok = await this.dragonService.buyDragon(
      buyParams.buyerAccountId,
      buyParams.dragonId,
    );
    return { ok };
  }

  @UseGuards(JwtAuthGuard)
  @Post('mate')
  async mateDragon(@Body() mateParams: MateDragonDto) {
    const { matronDragonId, patronDragonId } = mateParams;
    const matron = await this.dragonService.findOne(matronDragonId);
    if (!matron) {
      throw new Error('Matron dragon not found');
    }
    const patron = await this.dragonService.findOne(patronDragonId);
    if (!patron) {
      throw new Error('Patron dragon not found ');
    }

    const babyDragon = await this.dragonService.breedDragon(matron, patron);
    return { ok: true, dragon: babyDragon };
  }
}
