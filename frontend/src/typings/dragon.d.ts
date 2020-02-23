declare enum DragonColorCode {
  black = '#263238',
  white = '#cfd8dc',
  green = '#a5d6a7',
  blue = '#0277bd',
}

declare enum DragonSize {
  small = 100,
  medium = 140,
  large = 180,
  enormous = 220,
}

interface PropertyMap {
  backgroundColor: DragonColorCode;
  size: DragonSize;
  build: any;
  pattern: any;
}

type TraitType = keyof PropertyMap;
interface TraitPair {
  traitType: TraitType;
  traitValue: keyof PropertyMap[TraitType];
}

interface Dragon extends DragonProperty {
  dragonId: number;
  generationId: number;
  birthdate: string;
  traits: Array<TraitPair>;
}

interface DragonProperty {
  nickname: string;
  isPublic: boolean;
  saleValue: number;
  sireValue: number;
}
