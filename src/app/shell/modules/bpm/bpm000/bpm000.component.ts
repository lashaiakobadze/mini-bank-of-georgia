import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { ShellService } from 'src/app/shell/shell.service';
import { Client } from '../client.model';
import { ClientsService } from '../clients.service';

@Component({
  selector: 'bg-bpm000',
  templateUrl: './bpm000.component.html',
  styleUrls: ['./bpm000.component.scss']
})
export class Bpm000Component implements OnInit {
  clientForm: FormGroup;
  showClients: boolean;
  clients: Client[];
  curClient: Client;

  constructor(
    private clientsService: ClientsService,
    private loaderService: LoaderService,
    private shellService: ShellService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.showClients = false;
    this.initForm();
  }


  onfetchClients() {
    this.clientsService.fetchClients(this.clientForm.value)
    .pipe(this.loaderService.useLoader)
      .subscribe((clients) => {
        this.clients = clients;
      });
  }

  onSearch() {
    this.showClients = true;
    this.onfetchClients();
  }

  getClientData(e) {
    // console.log(this.clients.find(client => client.clientKey === +e.path[1].children[2].innerHTML));
    this.curClient = this.clients.find(client => client.clientKey === +e.path[1].children[2].innerHTML);
    this.shellService.curClient.next(this.curClient);
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
