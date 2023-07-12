import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';

import { BaseService } from 'src/app/shared/services/base.service';

import { AdminUser } from '../models/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService extends BaseService {

  constructor(private http: HttpClient) { super(); }

  getUsers(): Observable<AdminUser[]> {
    return this.http
      .get<AdminUser[]>(this.apiUrlV1 + 'admin/list-users', this.getAuthHeaders())
      .pipe(catchError(this.serviceError));
  }

  createUser(): Observable<AdminUser[]> {
    return this.http
      .get<AdminUser[]>(this.apiUrlV1 + 'admin/list-users', this.getAuthHeaders())
      .pipe(catchError(this.serviceError));
  }

}
