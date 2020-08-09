declare namespace API {
  type Optional<T> = T | undefined
  type TraitType = 'size' | 'build' | 'patten' | 'backgroundColor'
  type ImageProps = {
    [key in TraitType]: string
  }

  type DragonState = {
    id: number
    updated: boolean
    sellingPrice: number
    matingPrice: number
    isPublic: boolean
    name: string
  }

  interface Generation {
    id: number
    expiration: string
  }

  interface LogIn {
    jwt: string
  }

  interface Account {
    username: string
    password: string
  }

  interface Dragon {
    id: number
    birthdate: string
    nickname: string
    sireValue: number
    saleValue: number
    public: boolean
    traits: Trait[]
    generation: Generation
    account: AccountInfo
  }

  interface Trait {
    traitType: TraitType
    traitValue: string
  }

  interface AccountInfo {
    id: number
    username: string
    balance: number
  }
}
