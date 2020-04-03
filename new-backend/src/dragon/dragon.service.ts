import { Repository, Connection } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { GenerationEngineService } from 'src/generation/generation-engine.service';
import { Account } from 'src/account/account.entity';
import { TraitService } from 'src/trait/trait.service';

import { CreateDragonDto, UpdateDragonDto } from './dto';
import { Dragon } from './dragon.entity';

@Injectable()
export class DragonService {
  constructor(
    @InjectRepository(Dragon)
    private readonly dragonRepository: Repository<Dragon>,

    private readonly generationEngineService: GenerationEngineService,
    private readonly traitService: TraitService,
    private connection: Connection,
  ) {}

  async create(createDragonDto: CreateDragonDto): Promise<Dragon> {
    const dragon = new Dragon();
    dragon.birthdate = createDragonDto.birthdate;
    dragon.nickname = createDragonDto.nickname;
    dragon.isPublic = createDragonDto.isPublic;
    dragon.traits = await Promise.all(
      createDragonDto.traits.map(
        async ({ traitType, traitValue }) =>
          await this.traitService.find(traitType, traitValue),
      ),
    );

    dragon.generation = this.generationEngineService.generation;

    return this.dragonRepository.save(dragon);
  }

  findOne(dragonId: number): Promise<Dragon> {
    return this.dragonRepository.findOne(dragonId);
  }

  // TODO: Fix ok response
  async update(updateDragonDto: UpdateDragonDto): Promise<boolean> {
    const { id, ...updatedValues } = updateDragonDto;
    const { affected } = await this.dragonRepository.update(id, updatedValues);
    return affected > 0;
  }

  async getPublicDragons(): Promise<Dragon[]> {
    return this.dragonRepository.find({ isPublic: true });
  }

  // TODO: test this when frontend is ready
  // Reference  https://docs.nestjs.com/techniques/database#transactions
  async buyDragon(buyerId: number, dragonId: number) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    let result: boolean;
    try {
      const buyingDragon = await queryRunner.manager.findOne(Dragon, dragonId);

      // ! Potential improvement when not using Many-to-Many relation
      const sellerAccount = buyingDragon.accounts[0];
      // FIXME: services should not have logic
      if (sellerAccount.balance < buyingDragon.saleValue) {
        throw new Error('balance not enough');
      }

      const buyerAccount = await queryRunner.manager.findOne(Account, buyerId);

      // swap ownership
      sellerAccount.dragons = sellerAccount.dragons.filter(dragon => {
        dragon.id !== buyingDragon.id;
      });
      sellerAccount.balance += buyingDragon.saleValue;
      buyerAccount.balance -= buyingDragon.saleValue;
      buyerAccount.dragons.push(buyingDragon);
      buyingDragon.isPublic = false;
      buyingDragon.saleValue = 0;
      buyingDragon.sireValue = 0;

      await queryRunner.manager.save([
        sellerAccount,
        buyerAccount,
        buyingDragon,
      ]);

      await queryRunner.commitTransaction();
      result = true;
    } catch (error) {
      console.error(error);
      result = false;
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    return result;
  }

  async breedDragon(matron: Dragon, patron: Dragon): Promise<Dragon> {
    const babyTraits = matron.traits.map(matronTrait => {
      const patronTrait = patron.traits.find(
        trait => trait.traitType === matronTrait.traitType,
      );
      return this.traitService.mixTrait(matronTrait, patronTrait);
    });

    const createDragonDto = new CreateDragonDto(
      this.generationEngineService.generation.id,
      'New Baby!',
      babyTraits,
    );
    return this.create(createDragonDto);
  }
}
