import base64 from 'base-64';
import Dragon from './index';

export default class Breeder {
  static breedDragon({ matron, patron }) {
    const matronTraits = matron.traits;
    const patronTraits = patron.traits;

    const babyTraits = [];

    matronTraits.forEach(({ traitType, traitValue }) => {
      const matronTrait = traitValue;

      const patronTrait = patronTraits.find(
        trait => trait.traitType === traitType,
      ).traitValue;

      babyTraits.push({
        traitType,
        traitValue: this.pickTrait({ matronTrait, patronTrait }),
      });
    });

    return new Dragon({ nickname: 'New Baby!', traits: babyTraits });
  }

  // Two incoming traits: matronTrait and patronTrait
  // The matronTrait and patronTrait string values are encoded
  // Both traits have their characters summed.
  // Get a range by adding both character sums.
  // If the number is less than the matron's character sum, pick matron.
  // Else, pick patron
  static pickTrait({ matronTrait, patronTrait }) {
    if (matronTrait === patronTrait) return matronTrait;

    const matronTraitCharSum = this.charSum(base64.encode(matronTrait));
    const patronTraitCharSum = this.charSum(base64.encode(patronTrait));

    const randNum = Math.floor(
      Math.random() * (matronTraitCharSum, patronTraitCharSum),
    );

    return randNum < matronTraitCharSum ? matronTrait : patronTrait;
  }

  static charSum(string) {
    string
      .split('')
      .reduce((sum, character) => (sum += character.charCodeAt()), 0);
  }
}
