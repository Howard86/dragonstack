interface UserAccount {
  loggedIn: boolean;
  balance: number;
  username: string;
  dragons?: Array<Dragon>;
}
