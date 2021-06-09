export class ClientRegister {
  public firstName: string;
  public lastName: string;
  public plusPoints: number;

  constructor(firstName: string, lastName: string, plusPoints: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.plusPoints = plusPoints;
  }
}
