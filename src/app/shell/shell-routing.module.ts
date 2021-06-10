import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../shared/guards/auth.guard';
import { ShellGuard } from '../shared/guards/shell.guard';

import { ShellComponent } from './shell.component';


const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'bpm',
        loadChildren: () => import('./modules/bpm/bpm.module').then(m => m.BpmModule)
      },
      {
        path: 'krn',
        canActivate: [ShellGuard],
        loadChildren: () => import('./modules/krn/krn.module').then(m => m.KrnModule)
      },
      {
        path: 'pmd',
        canActivate: [ShellGuard],
        loadChildren: () => import('./modules/pmd/pmd.module').then(m => m.PmdModule)
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class ShellRoutingModule { }
