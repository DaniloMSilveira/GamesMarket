import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';

import { BaseService } from 'src/app/shared/services/base.service';

import {
  AuthenticationResponse,
  RegisterDto,
  UserCredentials
} from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  constructor(private http: HttpClient) { super(); }

  register(dto: RegisterDto): Observable<AuthenticationResponse> {
    const response = this.http
      .post(this.apiUrlV1 + 'auth/register', dto, this.getDefaultHeaders())
      .pipe(
          map(this.extractData),
          catchError(this.serviceError)
        );

    return response;
  }

  login(userCredentials: UserCredentials): Observable<AuthenticationResponse> {
    const response = this.http
      .post(this.apiUrlV1 + 'auth/login', userCredentials, this.getDefaultHeaders())
      .pipe(
          map(this.extractData),
          catchError(this.serviceError)
        );

    return response;
  }

  saveToken(authenticationResponse: AuthenticationResponse) {
    this.localStorageUtils.setTokenInfo(
      authenticationResponse.accessToken,
      authenticationResponse.expiresIn.toString(),
      JSON.stringify(authenticationResponse.userToken)
    );
  }
}
