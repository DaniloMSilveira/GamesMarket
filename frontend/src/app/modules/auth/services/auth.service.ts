import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { AuthLocalStorage } from 'src/app/shared/storage/auth-local-storage';
import { DefaultHttpResponse } from 'src/app/shared/models/http.model';

import {
  AuthenticationResponse,
  UserCreateDTO,
  UserCredentials
} from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authLocalStorage = new AuthLocalStorage();

  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL + '/v1';

  register(userCreateDTO: UserCreateDTO): Observable<DefaultHttpResponse> {
    return this.http.post<DefaultHttpResponse>(this.apiURL + "/auth/register", userCreateDTO);
  }

  login(userCredentials: UserCredentials): Observable<DefaultHttpResponse> {
    return this.http.post<DefaultHttpResponse>(this.apiURL + "/auth/login", userCredentials);
  }

  saveToken(authenticationResponse: AuthenticationResponse) {
    this.authLocalStorage.setTokenInfo(
      authenticationResponse.token,
      authenticationResponse.expiration.toString()
    );
  }
}
