export class Transfer {
  public senderAccountKey: number;
  public receivedAccountKey: number;
  public amount: number;

  constructor(
    senderAccountKey: number,
    receivedAccountKey: number,
    amount: number,
  ) {
    this.senderAccountKey = senderAccountKey;
    this.receivedAccountKey = receivedAccountKey;
    this.amount = amount;
  }
}
