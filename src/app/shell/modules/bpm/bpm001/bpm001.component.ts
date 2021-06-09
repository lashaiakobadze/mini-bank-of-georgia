import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { BGValidators } from 'src/app/shared/validators/bg-validators';
import { ClientsService } from '../clients.service';
import { ClientRegister } from './clientRegister.model';

@Component({
  selector: 'bg-bpm001',
  templateUrl: './bpm001.component.html',
  styleUrls: ['./bpm001.component.scss']
})
export class Bpm001Component implements OnInit {
  clientRegister: FormGroup;
  errorMsg: any = null;
  successMsg: string = null;

  constructor(
    private clientsService: ClientsService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }


  onClientRegister() {
    if (this.clientRegister.invalid) {
      console.log('form is not valid!!!');
      return;
    }
    this.clientsService.createClient(new ClientRegister(
      this.clientRegister.value.firstName,
      this.clientRegister.value.lastName,
      this.clientRegister.value.plusPoints
      ))
      .subscribe(() => {
        this.successMsg = 'პოსტი წარმატებით დაემატა';
        this.clientRegister.reset();
      }, err => {
        this.errorMsg = err.error;
        console.log(this.errorMsg);
      }
    );
  }

  errors(controlName: string | (string | number)[]) {
    return Object.values(this.get(controlName).errors);
  }

  get(controlName: string | (string | number)[]): AbstractControl {
    return this.clientRegister.get(controlName);
  }

  initForm() {
    this.clientRegister = new FormGroup({
      firstName: new FormControl('', [
        BGValidators.required,
        BGValidators.minLengthCustom,
        BGValidators.maxLengthCustom,
      ]),
      lastName: new FormControl('', [
        BGValidators.required,
        BGValidators.minLengthCustom,
        BGValidators.maxLengthCustom,
      ]),
      plusPoints: new FormControl('', [
        BGValidators.required,
        BGValidators.minNumber
      ]),
    });
  }

}
