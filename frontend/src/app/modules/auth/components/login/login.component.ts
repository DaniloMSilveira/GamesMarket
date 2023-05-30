import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  form: FormGroup;
  errors: string[] = [];
  returnUrl: string;

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      userName: ['', {
        validators: [Validators.required]
      }],
      password: ['', {
        validators: [Validators.required]
      }]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
  }

  login(userCredentials: UserCredentials) {
    this.authService
      .login(userCredentials)
      .subscribe({
        next: (result: AuthenticationResponse) => {
          this.authService.saveToken(result);

          this.toastr.success(
            "You've successfully authenticated",
            `Welcome ${userCredentials.userName}`
          );
          this.returnUrl
            ? this.router.navigate([this.returnUrl])
            : this.router.navigate(['/home']);
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
