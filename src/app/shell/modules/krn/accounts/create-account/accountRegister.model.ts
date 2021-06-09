export class AccountRegister {
  clientKey: number;
  accountName: string;
  amount: number;

  constructor(
    clientKey: number,
    accountName: string,
    amount: number,
  ) {
    this.clientKey = clientKey;
    this.accountName = accountName;
    this.amount = amount;
  }
}
