import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { LocalStorageUtils } from '../storage/local-storage';

@Injectable({
  providedIn: 'root'
})
export class ActiveGuard implements CanActivate {

  localStorageUtils = new LocalStorageUtils();

  constructor(private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.localStorageUtils.isAuthenticated()){
      return true;
    }

    this.router.navigate(['/auth/login']);      
    return false;
  }
  
}
