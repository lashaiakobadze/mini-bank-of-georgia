import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { ShellService } from '../shell.service';

@Component({
  selector: 'bg-shell-header',
  templateUrl:  './shell-header.component.html',
  styleUrls: ['./shell-header.component.scss']
})
export class ShellHeaderComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private shellService: ShellService
  ) { }

  ngOnInit(): void {
  }

  onLogOut() {
    this.authService.logout();
    localStorage.removeItem('clientData');
    this.shellService.curClient.next(null);
  }

}
