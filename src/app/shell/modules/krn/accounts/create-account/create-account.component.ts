import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { BGValidators } from 'src/app/shared/validators/bg-validators';
import { ShellService } from 'src/app/shell/shell.service';
import { Client } from '../../../bpm/client.model';
import { AccountsService } from '../accounts.service';
import { AccountRegister } from './accountRegister.model';

@Component({
  selector: 'bg-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  curClient: Client;
  createAccountForm: FormGroup;
  errorMsg: any;

  constructor(
    private shellService: ShellService,
    public accountsService: AccountsService,
    private loaderService: LoaderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.shellService.curClient.subscribe(client => {
      this.curClient = client;
      }
    );
    this.initForm();
    this.accountsService.accountCreateMode = true;
  }

  onCreateAccount() {
    console.log(this.createAccountForm.value);
    if (this.createAccountForm.invalid) {
      console.log('form is not valid!!!');
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
    }, err => {
      this.errorMsg = err.error;
      console.log(this.errorMsg);
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

}
