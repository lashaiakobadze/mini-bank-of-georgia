import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { BGValidators } from 'src/app/shared/validators/bg-validators';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { ShellService } from 'src/app/shell/shell.service';
import { AccountsService } from '../accounts.service';

import { Client } from '../../../bpm/client.model';
import { AccountRegister } from './accountRegister.model';
import { AlertService } from 'src/app/shared/alert/alert.service';


@Component({
  selector: 'bg-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit, OnDestroy {
  curClient: Client;
  createAccountForm: FormGroup;

  curClientSub: Subscription;

  constructor(
    private shellService: ShellService,
    public accountsService: AccountsService,
    private loaderService: LoaderService,
    private router: Router,
    public alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.curClientSub = this.shellService.curClient.subscribe(client => {
      this.curClient = client;
      }
    );
    this.initForm();
  }

  onCreateAccount() {
    if (this.createAccountForm.invalid) {
      return;
    }

    this.accountsService.createAccount(new AccountRegister(
      this.curClient.clientKey,
      this.createAccountForm.value.accountName,
      this.createAccountForm.value.amount
      )
    )
    .pipe(this.loaderService.useLoader)
    .subscribe(() => {
      this.createAccountForm.reset();
      this.router.navigate(['/krn/accounts']);
    }, error => {
      this.alertService.errorMessage = error;
    });
  }

  errors(controlName: string | (string | number)[]) {
    return Object.values(this.get(controlName).errors);
  }

  get(controlName: string | (string | number)[]): AbstractControl {
    return this.createAccountForm.get(controlName);
  }

  initForm() {
    this.createAccountForm = new FormGroup({
      accountName: new FormControl('', [
        BGValidators.required,
        BGValidators.minLengthCustom,
        BGValidators.maxLengthCustom,
      ]),
      amount: new FormControl('', [
        BGValidators.required,
        BGValidators.minNumber
      ]),
    });
  }

  ngOnDestroy() {
    this.curClientSub?.unsubscribe();
  }

}
