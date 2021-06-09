export class Account {
  accountKey: number;
  accountName: string;
  clientFirstName: string;
  clientLastName: string;
  amount: number;

  constructor(
    accountKey: number,
    accountName: string,
    clientFirstName: string,
    clientLastName: string,
    amount: number,
  ) {
    this.accountKey = accountKey;
    this.accountName = accountName;
    this.clientFirstName = clientFirstName;
    this.clientLastName = clientLastName;
    this.amount = amount;
  }
}
