import { Injectable } from '@angular/core';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { HttpClient } from '@angular/common/http';

import { Transfer } from './transfer.model';

@Injectable({
  providedIn: 'root'
})
export class PmdService {

  constructor(
    private http: HttpClient,
    private loaderService: LoaderService,
  ) { }

  fetchAccounts() {
    return this.http
      .get<Account[]>(`accounts`)
      .pipe(this.loaderService.useLoader);
  }

  fetchCurrentClientAccounts(clientKey: number) {
    return this.http
      .get<Account[]>(`accounts?clientKey=${clientKey}`)
      .pipe(this.loaderService.useLoader);
  }


  transferService(senderAccountKey, receiverAccountKey, amount) {
    return this.http.post<Transfer>('transfer', {
      senderAccountKey,
      receiverAccountKey,
      amount
    }).pipe(this.loaderService.useLoader);
  }
}
