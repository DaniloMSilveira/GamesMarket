import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parseWebAPIErrors } from 'src/app/shared/utils';
import { AuthenticationResponse, RegisterDto } from '../../models/auth.models';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private formbuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  form: FormGroup
  errors: string[] = [];

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      name: ['', {
        validators: [Validators.required]
      }],
      email: ['', {
        validators: [Validators.required, Validators.email]
      }],
      userName: ['', {
        validators: [Validators.required]
      }],
      password: ['', {
        validators: [Validators.required]
      }]
    })
  }


  register(dto: RegisterDto) {
    this.authService
      .register(dto)
      .subscribe({
        next: (result: AuthenticationResponse) => {
          this.authService.saveToken(result);

          this.toastr.success(
            "You've successfully registered",
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
              'Error on register',
            );
          }
        }
      })
  }

  getEmailErrorMessage(){
    var field = this.form.get('email');
    if (field.hasError('required')){
      return "The field Email is required";
    }

    if (field.hasError('email')){
      return "The field Email is invalid";
    }

    return '';
  }

}
