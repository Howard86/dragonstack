declare namespace APIResponse {
  interface Unauthorized {
    statusCode: 401;
    error: 'Unauthorized';
  }

  interface Login extends UserAccountResponse {
    dragons: Dragon[];
  }

  type SignUp = UserAccountResponse;

  interface Dragon extends DragonProperty {
    id: number;
    generation: Generation;
    birthdate: string;
    traits: TraitPair[];
  }
}
