interface UserAccountResponse {
  id?: number;
  username: string;
  password?: string; // as hash
  balance: number;
  jwt: string;
}

interface LogInResponse extends UserAccountResponse {
  dragons: Dragon[];
}

interface UserAccount {
  loggedIn: boolean;
  balance: number;
  username: string;
  dragons?: Array<Dragon>;
}
