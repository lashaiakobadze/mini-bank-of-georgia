import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { KrnRoutingModule } from './krn-routing.module';

import { AccountsComponent } from './accounts/accounts.component';
import { CreateAccountComponent } from './accounts/create-account/create-account.component';
import { KrnicpComponent } from './krnicp/krnicp.component';
import { OperationsComponent } from './operations/operations.component';
import { KrnComponent } from './krn.component';



@NgModule({
  declarations: [
    KrnComponent,
    AccountsComponent,
    CreateAccountComponent,
    KrnicpComponent,
    OperationsComponent
  ],
  imports: [
    SharedModule,
    KrnRoutingModule
  ]
})
export class KrnModule { }
