import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthLocalStorage } from '../shared/storage/auth-local-storage';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  authLocalStorage = new AuthLocalStorage();

  constructor(private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authLocalStorage.getRole() === 'admin'){
      return true;
    }

    this.router.navigate(['/auth/login']);      
    return false;
  }
  
}
