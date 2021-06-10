import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppPreloadingService } from './app-preloading.service';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    data: { preload: true },
  },
  {
    path: '',
    loadChildren: () => import('./shell/shell.module').then(m => m.ShellModule),
    data: { preload: true },
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RouterModule.forRoot(routes, { preloadingStrategy: AppPreloadingService }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
