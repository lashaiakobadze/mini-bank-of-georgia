import { Component, OnInit } from '@angular/core';
import { AlertService } from './shared/alert/alert.service';
import { AuthService } from './shared/auth/auth.service';
import { ShellService } from './shell/shell.service';

@Component({
  selector: 'bg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private shellService: ShellService,
    public alertService: AlertService
  ) {}

  ngOnInit() {
    this.authService.autoLogin();
    this.shellService.autoLoginClient();
  }
}
