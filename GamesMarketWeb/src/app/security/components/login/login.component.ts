import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parseWebAPIErrors } from 'src/app/shared/utils';
import { UserCredentials } from '../../security.models';
import { SecurityService } from '../../security.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
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
      .subscribe((authenticationResponse) => {
        this.securityService.saveToken(authenticationResponse);
        this.router.navigate(['/home']);
      }, error => this.errors = parseWebAPIErrors(error));
  }
}
