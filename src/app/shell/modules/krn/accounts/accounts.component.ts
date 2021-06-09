import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { ShellService } from 'src/app/shell/shell.service';
import { Client } from '../../bpm/client.model';
import { Account } from './account.model';
import { AccountsService } from './accounts.service';

@Component({
  selector: 'bg-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  curClient: Client;
  curClientAccounts: Account[] = null;
  curAccount: Account;

  constructor(
    private shellService: ShellService,
    public accountService: AccountsService,
    private loaderService: LoaderService,
    private renderer: Renderer2,
    private elRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.shellService.curClient
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
      console.log(this.curClientAccounts);
      }
    );
    this.accountService.accountCreateMode = false;
  }

  onDeleteAccount(e) {
    this.curAccount = this.curClientAccounts.find(account => account.accountName === e.path[2].children[1].innerHTML);
    this.accountService.deleteAccount(this.curAccount.accountKey)
    .pipe(this.loaderService.useLoader)
    .subscribe();
    e.path[2].style.display = 'none';
    // this.renderer.setStyle(this.elRef.nativeElement, 'color', 'red');
    // this.router.navigate(['krn/accounts']);
    // this.curClientAccounts = null;
    // this.accountService.fetchClientAccounts(this.curClient.clientKey)
    // .pipe(this.loaderService.useLoader)
    // .subscribe(clientAccounts => {
    //     this.curClientAccounts = clientAccounts;
    //   }
    // );
  }

}
