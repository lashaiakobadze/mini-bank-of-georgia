import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Client } from './modules/bpm/client.model';

@Injectable({
  providedIn: 'root'
})
export class ShellService {
  curClient = new BehaviorSubject<Client>(null);

  constructor(
    private http: HttpClient,
    // private authService: AuthService
  ) {}


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
