import TRAITS from 'src/trait/trait.constant';
import { Trait } from 'src/trait/trait.entity';

const getRandomTraits = (): Trait[] => {
  const traits = [];

  TRAITS.forEach(TRAIT => {
    const traitType = TRAIT.type;
    const traitValues = TRAIT.values;

    const traitValue =
      traitValues[Math.floor(Math.random() * traitValues.length)];

    traits.push({ traitType, traitValue });
  });
  return traits;
};

export class CreateDragonDto {
  nickname: string = 'unnamed';
  birthdate: Date = new Date();
  traits: Trait[] = getRandomTraits();
  isPublic: boolean = false;
  saleValue: number;
  sireValue: number;

  constructor(public generationId: number) {}
}
