import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { BGValidators } from 'src/app/shared/validators/bg-validators';
import { ShellService } from 'src/app/shell/shell.service';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { ClientsService } from '../clients.service';
import { ClientRegister } from './clientRegister.model';

@Component({
  selector: 'bg-bpm001',
  templateUrl: './bpm001.component.html',
  styleUrls: ['./bpm001.component.scss']
})
export class Bpm001Component implements OnInit {
  clientRegister: FormGroup;

  constructor(
    private clientsService: ClientsService,
    private shellService: ShellService,
    private router: Router,
    public alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  onClientRegister() {
    if (this.clientRegister.invalid) {
      return;
    }

    this.clientsService.createClient(new ClientRegister(
      this.clientRegister.value.firstName,
      this.clientRegister.value.lastName,
      this.clientRegister.value.plusPoints
      ))
      .subscribe(newClient => {
        this.clientRegister.reset();
        this.shellService.curClient.next(newClient);
        this.router.navigate(['/krn']);
      }, error => {
        this.alertService.errorMessage = error;
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
