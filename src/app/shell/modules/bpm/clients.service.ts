import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Client } from './client.model';
import { ClientRegister } from './bpm001/clientRegister.model';


@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) {}

  createClient(client: ClientRegister) {
    return this.http.put('clients', {
      firstName: client.firstName,
      lastName: client.lastName,
      plusPoints: client.plusPoints
    });
  }

  fetchClients(client?: Client) {
    return this.http.
      get<Client[]>(`clients?firstName=${client?.firstName}&lastName=${client?.lastName}&clientKey=${client?.clientKey}`);
  }
}
