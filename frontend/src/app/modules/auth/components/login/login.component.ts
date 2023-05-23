import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { UserCredentials } from '../../models/auth.models';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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
        next: (authenticationResponse) => {
          this.authService.saveToken(authenticationResponse);
          this.router.navigate(['/home']);
        },
        error: (e) => this.toastr.error(
          e.message || 'Internal error', 
          'Error on authentication', 
          {
            closeButton: true,
            progressBar: true,
          }
        )
      })
  }
}
