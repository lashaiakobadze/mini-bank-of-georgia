import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/auth/auth.guard';
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
        loadChildren: () => import('./modules/krn/krn.module').then(m => m.KrnModule)
      },
      {
        path: 'pmd',
        loadChildren: () => import('./modules/pmd/pmd.module').then(m => m.PmdModule)
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class ShellRoutingModule { }
