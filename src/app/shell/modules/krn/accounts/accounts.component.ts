import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoaderService } from 'src/app/shared/loader/loader.service';
import { ShellService } from 'src/app/shell/shell.service';
import { AccountsService } from './accounts.service';

import { Client } from '../../bpm/client.model';
import { Account } from './account.model';


@Component({
  selector: 'bg-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit, OnDestroy {
  curClient: Client;
  curClientAccounts: Account[] = [];
  curAccount: Account;

  curClientSub: Subscription;

  constructor(
    private shellService: ShellService,
    public accountService: AccountsService,
    private loaderService: LoaderService,
  ) { }

  ngOnInit(): void {
    this.curClientSub = this.shellService.curClient
    .subscribe(client => {
      this.curClient = client;
      }
    );
    this.accountService.fetchClientAccounts(this.curClient.clientKey)
    .pipe(this.loaderService.useLoader)
    .subscribe(clientAccounts => {
      if (clientAccounts.length < 1) {
        return;
      }
      this.curClientAccounts = clientAccounts;
      }
    );
  }

  onDeleteAccount(accountKey: number) {
    this.curClientAccounts = this.curClientAccounts.filter(account => account.accountKey !== accountKey);
    this.accountService.deleteAccount(accountKey)
    .pipe(this.loaderService.useLoader)
    .subscribe();
  }

  ngOnDestroy() {
    this.curClientSub?.unsubscribe();
  }

}
