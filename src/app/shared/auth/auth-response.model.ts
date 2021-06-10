export class AuthResponse {
  token: string;
  expirationDate: number;
  name:	string;
  username:	string;
  image:	string;

  constructor(
    token: string,
    expirationDate: number,
    name:	string,
    username:	string,
    image:	string,
  ) {
    this.token = token;
    this.expirationDate = expirationDate;
    this.name = name;
    this.username = username;
    this.image = image;
  }
}
