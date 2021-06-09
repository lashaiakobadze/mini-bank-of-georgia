export class User {
  constructor(
    public name: string,
    public username: string,
    public image: string,
    // tslint:disable-next-line:variable-name
    private _token: string,
    // tslint:disable-next-line:variable-name
    private _tokenExpirationDate: Date
  ) {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return undefined;
    }
    return this._token;
  }
}
