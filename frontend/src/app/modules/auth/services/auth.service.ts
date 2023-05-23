import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { AuthLocalStorage } from 'src/app/shared/storage/auth-local-storage';

import {
  authenticationResponse,
  UserCreateDTO,
  UserCredentials,
  userDTO
} from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authLocalStorage = new AuthLocalStorage();

  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL;
  private readonly tokenKey: string = 'token';
  private readonly expirationTokenKey: string = 'token-expiration'
  private readonly roleField = "role";

  register(userCreateDTO: UserCreateDTO): Observable<authenticationResponse> {
    return this.http.post<authenticationResponse>(this.apiURL + "/user/create", userCreateDTO);
  }

  login(userCredentials: UserCredentials): Observable<authenticationResponse> {
    return this.http.post<authenticationResponse>(this.apiURL + "/user/login", userCredentials);
  }

  saveToken(authenticationResponse: authenticationResponse) {
    this.authLocalStorage.setTokenInfo(
      authenticationResponse.token,
      authenticationResponse.expiration.toString()
    );
  }
}
