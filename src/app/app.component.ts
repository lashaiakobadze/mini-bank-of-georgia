import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertComponent } from './shared/alert/alert.component';
import { AuthService } from './shared/auth/auth.service';
import { PlaceholderDirective } from './shared/directives/placeholder.directive';
import { ShellService } from './shell/shell.service';

@Component({
  selector: 'bg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  closeSub: Subscription;

  @ViewChild(PlaceholderDirective) alertPlaceholder: PlaceholderDirective;

  constructor(
    private authService: AuthService,
    private shellService: ShellService,
    private cfr: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    this.authService.autoLogin();
    this.shellService.autoLoginClient();
  }

  private showError(error: string) {
    const alertComponentFactory = this.cfr.resolveComponentFactory(
      AlertComponent
    );
    this.alertPlaceholder.viewContainerRef.clear();
    const alertRef = this.alertPlaceholder.viewContainerRef.createComponent(
      alertComponentFactory
    );
    alertRef.instance.error = error;
    this.closeSub = alertRef.instance.closeClick.subscribe(() => {
      this.closeSub.unsubscribe();
      this.alertPlaceholder.viewContainerRef.clear();
    });
  }

  ngOnDestroy() {
    this.closeSub?.unsubscribe();
  }

}
