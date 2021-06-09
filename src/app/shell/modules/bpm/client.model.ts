export class Client {
  clientKey: number;
  firstName: string;
  image: string;
  lastName: string;
  plusPoints: number;
  sumAmount: number;

  constructor(
    clientKey: number,
    firstName: string,
    image: string,
    lastName: string,
    plusPoints: number,
    sumAmount: number,
  ) {
    this.clientKey = clientKey;
    this.firstName = firstName;
    this.image = image;
    this.lastName = lastName;
    this.plusPoints = plusPoints;
    this.sumAmount = sumAmount;
  }
}
