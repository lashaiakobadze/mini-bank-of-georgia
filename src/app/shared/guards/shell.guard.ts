import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { ShellService } from 'src/app/shell/shell.service';

@Injectable({
  providedIn: 'root',
})
export class ShellGuard implements CanActivate {
  constructor(
    private shellService: ShellService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.shellService.curClient.pipe(
      take(1),
      map((client) => {
        if (!!client) {
          return true;
        }
        return this.router.createUrlTree(['/bpm']);
      })
    );
  }
}
