import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ClientsService } from '../clients.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { ShellService } from 'src/app/shell/shell.service';
import { Client } from '../client.model';


@Component({
  selector: 'bg-bpm000',
  templateUrl: './bpm000.component.html',
  styleUrls: ['./bpm000.component.scss']
})
export class Bpm000Component implements OnInit {
  clientForm: FormGroup;
  clients: Client[];
  curClient: Client;

  constructor(
    private clientsService: ClientsService,
    private loaderService: LoaderService,
    private shellService: ShellService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.clients = null;
  }

  onfetchClients() {
    this.clientsService.fetchClients(this.clientForm.value)
    .pipe(this.loaderService.useLoader)
      .subscribe((clients) => {
        if (!clients) {
          this.clients = [];
        }
        this.clients = clients;
      }
    );
  }

  onSearch() {
    this.onfetchClients();
  }

  getClientData(clientKey: number) {
    this.curClient = this.clients.find(client => client.clientKey === clientKey);
    this.shellService.curClient.next(this.curClient);
    if (!this.curClient) {
      return;
    }
    this.router.navigate(['/krn']);
    localStorage.setItem('clientData', JSON.stringify(this.curClient));
  }

  initForm() {
    this.clientForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      clientKey: new FormControl(''),
    });
  }
}
