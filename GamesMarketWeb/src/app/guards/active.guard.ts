import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { SecurityService } from '../security/security.service';

@Injectable({
  providedIn: 'root'
})
export class ActiveGuard implements CanActivate {
  constructor(private securityService: SecurityService, private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.securityService.isAuthenticated()){
      return true;
    }

    this.router.navigate(['/auth/login']);      
    return false;
  }
  
}
