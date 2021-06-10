import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Account } from './account.model';
import { AccountRegister } from './create-account/accountRegister.model';


@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient) { }

  createAccount(account: AccountRegister) {
    return this.http.put('accounts', {
      clientKey: account.clientKey,
      accountName: account.accountName,
      amount: account.amount
    });
  }

  fetchClientAccounts(key: number) {
    return this.http.get<Account[]>(`accounts?clientKey=${key}`);
  }

  deleteAccount(key: number) {
    return this.http.delete(`accounts?accountKey=${key}`);
  }

}
