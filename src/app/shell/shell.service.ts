import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Client } from './modules/bpm/client.model';


@Injectable({
  providedIn: 'root'
})
export class ShellService {
  curClient = new BehaviorSubject(null);
  // არ მუშაობს Client მოდელზე, მხოლოდ კლიენტის რეგისტრაციისას, API-დან მოსული კლიენტისათვის, დანარჩენი ყველგან კარგადაა საქმე.
  // curClient = new BehaviorSubject<Client>(null);


  constructor() {}

  autoLoginClient() {
    const clientData = JSON.parse(localStorage.getItem('clientData'));
    if (!clientData) {
      return;
    }

    const curClient = new Client(
      clientData.clientKey,
      clientData.firstName,
      clientData.image,
      clientData.lastName,
      clientData.plusPoints,
      clientData.sumAmount
    );
    this.curClient.next(curClient);
  }
}
