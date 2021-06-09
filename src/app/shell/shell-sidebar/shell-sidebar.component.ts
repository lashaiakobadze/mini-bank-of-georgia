import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'bg-shell-sidebar',
  templateUrl: './shell-sidebar.component.html',
  styleUrls: ['./shell-sidebar.component.scss']
})
export class ShellSidebarComponent implements OnInit, OnDestroy {
  curUser: any;
  // isAuthenticated = false;
  userSub: Subscription;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    // this.authService.autoLogin();
    this.userSub = this.authService.user.subscribe((user) => {
      // this.isAuthenticated = !!user;
      if (!user) { return; }
      if (user) {
        this.curUser = user;
      }
    });
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
