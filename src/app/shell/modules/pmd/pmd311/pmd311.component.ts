import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/shared/alert/alert.service';

import { BGValidators } from 'src/app/shared/validators/bg-validators';
import { ShellService } from 'src/app/shell/shell.service';
import { Client } from '../../bpm/client.model';
import { PmdService } from '../pmd.service';

@Component({
  selector: 'bg-pmd311',
  templateUrl: './pmd311.component.html',
  styleUrls: ['./pmd311.component.scss']
})
export class Pmd311Component implements OnInit, OnDestroy {
  sendAmountForm: FormGroup;
  allAccounts: Account[];
  curClientAccounts: Account[];
  curClient: Client;

  accountsSub: Subscription;
  curClientAccountsSub: Subscription;
  curClientSub: Subscription;

  constructor(
    private pmdService: PmdService,
    private shellService: ShellService,
    private router: Router,
    public alertService: AlertService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.curClientSub = this.shellService.curClient.subscribe(
      curClient => this.curClient = curClient
    );

    this.accountsSub = this.pmdService.fetchAccounts().subscribe(
      accountsData => {
        this.allAccounts = accountsData;
      }
    );

    this.curClientAccountsSub = this.pmdService.fetchCurrentClientAccounts(this.curClient.clientKey).subscribe(
      accountData => {
        this.curClientAccounts = accountData;
      }
    );
  }

  onSendAmount() {
    this.pmdService.transferService(
      +this.sendAmountForm.value.senderAccountKey,
      +this.sendAmountForm.value.receiverAccountKey,
      this.sendAmountForm.value.amount,
    )
    .subscribe(transferData => {
        if (!transferData) {
          return;
        }
        console.log(transferData);
        this.shellService.fetchClient(this.curClient.clientKey)
        .subscribe( updatedClientData => {
            this.shellService.curClient.next(updatedClientData);
            localStorage.setItem('clientData', JSON.stringify(updatedClientData));
          }
        );
        this.router.navigate(['/krn/accounts']);
      }, error => {
        this.alertService.errorMessage = error;
      }
    );
  }

  ngOnDestroy() {
    this.accountsSub?.unsubscribe();
    this.curClientAccountsSub?.unsubscribe();
    this.curClientSub?.unsubscribe();
  }

  errors(controlName: string | (string | number)[]) {
    return Object.values(this.get(controlName).errors);
  }

  get(controlName: string | (string | number)[]): AbstractControl {
    return this.sendAmountForm.get(controlName);
  }

  initForm() {
    this.sendAmountForm = new FormGroup({
      senderAccountKey: new FormControl('', [
        BGValidators.required,
      ]),
      receiverAccountKey: new FormControl('', [
        BGValidators.required,
      ]),
      amount: new FormControl('', [
        BGValidators.required,
        BGValidators.minNumber
      ]),
    });
  }

}
