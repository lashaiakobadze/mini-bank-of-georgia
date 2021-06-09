import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { BGValidators } from 'src/app/shared/validators/bg-validators';

@Component({
  selector: 'bg-pmd311',
  templateUrl: './pmd311.component.html',
  styleUrls: ['./pmd311.component.scss']
})
export class Pmd311Component implements OnInit {
  sendAmountForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.initForm();
  }

  onSendAmount() {
    console.log(this.sendAmountForm.value);
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
