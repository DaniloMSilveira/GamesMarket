import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthLocalStorage } from 'src/app/shared/storage/auth-local-storage';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  authLocalStorage = new AuthLocalStorage();

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authLocalStorage.getToken();

    if (token){
      req = req.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
      });
    }

    return next.handle(req);
  }
}
