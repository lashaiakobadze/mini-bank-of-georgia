import { Component, OnDestroy, OnInit, EventEmitter } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/alert.service';

import { BGValidators } from 'src/app/shared/validators/bg-validators';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'bg-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    public alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }
    const username = this.get('username').value;
    const password = this.get('password').value;
    this.authService.login(username, password).subscribe(
      () => {
        this.loginForm.reset();
        this.router.navigate(['bpm']);
      },
      (error) => {
        this.alertService.errorMessage = error;
      }
    );
  }

  errors(controlName: string | (string | number)[]) {
    return Object.values(this.get(controlName).errors);
  }

  get(controlName: string | (string | number)[]): AbstractControl {
    return this.loginForm.get(controlName);
  }

  initForm() {
    this.loginForm = new FormGroup({
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
    });
  }


  ngOnDestroy() {
  }

}
