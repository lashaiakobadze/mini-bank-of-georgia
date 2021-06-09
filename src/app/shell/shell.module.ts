import { NgModule } from '@angular/core';

import { ShellRoutingModule } from './shell-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ShellComponent } from './shell.component';
import { ShellHeaderComponent } from './shell-header/shell-header.component';
import { ShellSidebarComponent } from './shell-sidebar/shell-sidebar.component';
import { ClientHeaderComponent } from './client-header/client-header.component';

@NgModule({
  declarations: [
    ShellHeaderComponent,
    ShellSidebarComponent,
    ShellComponent,
    ClientHeaderComponent,
  ],
  imports: [
    SharedModule,
    ShellRoutingModule,
  ]
})
export class ShellModule { }
