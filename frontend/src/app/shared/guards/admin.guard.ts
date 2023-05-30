import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';

import { LocalStorageUtils } from '../storage/local-storage';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  localStorageUtils = new LocalStorageUtils();

  constructor(private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.localStorageUtils.getRole() === 'admin'){
      return true;
    }
         
    return false;
  }
  
}
