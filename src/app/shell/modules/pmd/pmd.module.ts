import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { PmdComponent } from './pmd.component';
import { Pmd311Component } from './pmd311/pmd311.component';



@NgModule({
  declarations: [
    PmdComponent,
    Pmd311Component,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: PmdComponent,
        children: [
          {
            path: 'pmd311',
            component: Pmd311Component
          },
          {
            path: '',
            redirectTo: 'pmd311',
            pathMatch: 'full',
          },
        ]
      }
    ]),
  ],
  exports: [RouterModule]
})
export class PmdModule { }
