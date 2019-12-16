const TRAITS = require('../app/data/traits.json');

const DEFAULT_PROPERTIES = {
  nickname: 'unnamed',
  get birthDate() {
    return new Date();
  },
  get randomTraits() {
    const traits = [];

    TRAITS.forEach(TRAIT => {
      const traitType = TRAIT.type;
      const traitValues = TRAIT.values;

      const traitValue =
        traitValues[Math.floor(Math.random() * traitValues.length)];

      traits.push({ traitType, traitValue });
    });

    return traits;
  },
};

class Dragon {
  constructor({ birthDate, nickname, traits } = {}) {
    this.birthDate = birthDate || DEFAULT_PROPERTIES.birthDate;
    this.nickname = nickname || DEFAULT_PROPERTIES.nickname;
    this.traits = traits || DEFAULT_PROPERTIES.randomTraits;
  }
}

module.exports = Dragon;
