import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Client } from '../modules/bpm/client.model';
import { ShellService } from '../shell.service';


@Component({
  selector: 'bg-client-header',
  templateUrl: './client-header.component.html',
  styleUrls: ['./client-header.component.scss']
})
export class ClientHeaderComponent implements OnInit, OnDestroy {
  curClient: Client;

  curClientSub: Subscription;

  constructor(
    public shellService: ShellService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.curClientSub = this.shellService.curClient.subscribe(
      client => this.curClient = client
    );
  }


  onLogOutClient() {
    this.shellService.curClient.next(null);
    localStorage.removeItem('clientData');
    this.router.navigate(['/bpm/bpm000']);
  }

  ngOnDestroy() {
    this.curClientSub?.unsubscribe();
    this.shellService.curClient.next(null);
  }

}
