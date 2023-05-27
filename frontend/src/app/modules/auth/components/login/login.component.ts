import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthenticationResponse, UserCredentials } from '../../models/auth.models';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  form: FormGroup;
  errors: string[] = [];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      userName: ['', {
        validators: [Validators.required]
      }],
      password: ['', {
        validators: [Validators.required]
      }]
    });
  }

  login(userCredentials: UserCredentials) {
    this.authService
      .login(userCredentials)
      .subscribe({
        next: (defaultHttpResponse) => {
          this.authService.saveToken(defaultHttpResponse.data as AuthenticationResponse);

          this.toastr.success(
            "You've successfully authenticated",
            'Welcome'
          );
          this.router.navigate(['/home']);
        },
        error: (e) => {
          if (e.error && e.error.errors) {
            this.errors = e.error.errors;
          } else {
            this.toastr.error(
              'Internal error. Please try again later', 
              'Error on authentication',
            );
          }
        }
      })
  }
}
