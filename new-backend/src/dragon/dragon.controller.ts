import { Controller, Get, Put, Body, Post } from '@nestjs/common';
import { DragonService } from './dragon.service';
import { Dragon } from './dragon.entity';
import { AccountService } from '../account/account.service';
import { CreateDragonDto } from './dto/create-dragon.dto';
import { GenerationEngineService } from '../generation/generation-engine.service';
import { UpdateDragonDto } from './dto/update-dragon.dto';

@Controller('dragon')
export class DragonController {
  constructor(
    private readonly dragonService: DragonService,
    private readonly accountService: AccountService,
    private readonly generationEngineService: GenerationEngineService,
  ) {}

  @Get()
  async getNewDragon(): Promise<Dragon> {
    const generationId = this.generationEngineService.generation.id;
    const createdDragon = new CreateDragonDto(generationId);
    const dragon = await this.dragonService.create(createdDragon);

    // FIXME: temp fix
    const accountId = 2;
    const account = await this.accountService.findById(accountId);
    account.dragons.push(dragon);
    await this.accountService.save(account);

    console.log('dragon', dragon);
    return dragon;
  }

  @Put('update')
  async updateDragon(@Body() dragon: UpdateDragonDto) {
    const ok = await this.dragonService.update(dragon);
    return { ok, data: dragon };
  }

  @Get('public-dragons')
  getPublicDragons() {
    return this.dragonService.getPublicDragons();
  }

  @Post('buy')
  async buyDragon() {}

  @Post('mate')
  async mateDragon() {}
}
