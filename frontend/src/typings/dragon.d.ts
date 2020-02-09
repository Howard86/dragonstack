interface TraitPair {
  traitType: string;
  traitValue: string;
}

interface Dragon {
  dragonId: number;
  generationId: number;
  birthdate: string;
  nickname: string;
  traits?: Array<TraitPair>;
  isPublic?: boolean;
  saleValue?: number;
  sireValue?: number;
}
