import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KrnComponent } from './krn.component';
import { KrnicpComponent } from './krnicp/krnicp.component';
import { AccountsComponent } from './accounts/accounts.component';
import { CreateAccountComponent } from './accounts/create-account/create-account.component';
import { OperationsComponent } from './operations/operations.component';

const routes: Routes = [
  {
    path: '',
    component: KrnComponent,
    children: [
      {
        path: '',
        redirectTo: 'krnicp',
        pathMatch: 'full',
      },
      {
        path: 'krnicp',
        component: KrnicpComponent
      },
      {
        path: 'accounts',
        component: AccountsComponent,
      },
      {
        path: 'accounts/create',
        component: CreateAccountComponent
      },
      {
        path: 'operations',
        component: OperationsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KrnRoutingModule { }
