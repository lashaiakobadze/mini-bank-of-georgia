import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/shared/alert/alert.service';

import { AuthService } from 'src/app/shared/auth/auth.service';
import { BGValidators } from 'src/app/shared/validators/bg-validators';

@Component({
  selector: 'bg-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    public alertService: AlertService
    ) {}

  ngOnInit(): void {
    this.initForm();
  }

  onRegister() {
    if (this.registerForm.invalid) {
      return;
    }
    const name = this.get('name').value;
    const username = this.get('username').value;
    const password = this.get('password').value;
    this.authService.register(name, username, password).subscribe(
      resData => {
        console.log(resData);
        this.registerForm.reset();
      },
      error => {
        this.alertService.errorMessage = error;
      }
    );
  }

  errors(controlName: string | (string | number)[]) {
    return Object.values(this.get(controlName).errors);
  }

  get(controlName: string | (string | number)[]): AbstractControl {
    return this.registerForm.get(controlName);
  }

  initForm() {
    this.registerForm = new FormGroup({
      name: new FormControl('', [
        BGValidators.required,
        BGValidators.minLengthCustom,
        BGValidators.maxLengthCustom,
      ]),
      username: new FormControl('', [
        BGValidators.required,
        BGValidators.minLengthCustom,
        BGValidators.maxLengthCustom,
        BGValidators.cannotContainSpace
      ]),
      password: new FormControl('', [
        BGValidators.required,
        BGValidators.minLengthCustom,
        BGValidators.maxLengthCustom
      ]),
      confirmPassword: new FormControl('', [
        BGValidators.required,
        BGValidators.minLengthCustom,
        BGValidators.maxLengthCustom,
        BGValidators.matchValues('password')
      ]),
    });
  }

}
