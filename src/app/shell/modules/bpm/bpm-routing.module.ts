import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BpmComponent } from './bpm.component';
import { Bpm000Component } from './bpm000/bpm000.component';
import { Bpm001Component } from './bpm001/bpm001.component';

const routes: Routes = [
  {
    path: '',
    component: BpmComponent,
    children: [
      {
        path: 'bpm000',
        component: Bpm000Component,
      },
      {
        path: 'bpm001',
        component: Bpm001Component,
      },
      {
        path: '',
        redirectTo: 'bpm000',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BpmRoutingModule {}
