import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthLocalStorage } from '../storage/auth-local-storage';

@Injectable({
  providedIn: 'root'
})
export class ActiveGuard implements CanActivate {

  authLocalStorage = new AuthLocalStorage();

  constructor(private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authLocalStorage.isAuthenticated()){
      return true;
    }

    this.router.navigate(['/auth/login']);      
    return false;
  }
  
}
