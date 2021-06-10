import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/shared/alert/alert.service';

import { BGValidators } from 'src/app/shared/validators/bg-validators';
import { ShellService } from 'src/app/shell/shell.service';
import { Client } from '../../bpm/client.model';
import { PmdService } from '../pmd.service';
import { Transfer } from '../transfer.model';

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
    public alertService: AlertService
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
    // console.log(
    //   new Transfer(
    //     this.sendAmountForm.value.senderAccountKey,
    //     +this.sendAmountForm.value.receiverAccountKey,
    //     +this.sendAmountForm.value.amount,
    //   )
    // );
    this.pmdService.transferService(295, 291, 1
      // +this.sendAmountForm.value.senderAccountKey,
      // +this.sendAmountForm.value.receiverAccountKey,
      // this.sendAmountForm.value.amount,
    )
    .subscribe(transferData => {
        if (!transferData) {
          return;
        }
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
