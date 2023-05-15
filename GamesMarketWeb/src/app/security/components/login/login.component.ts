import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { UserCredentials } from '../../security.models';
import { SecurityService } from '../../security.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private securityService: SecurityService,
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
    this.securityService
      .login(userCredentials)
      .subscribe({
        next: (authenticationResponse) => {
          this.securityService.saveToken(authenticationResponse);
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
