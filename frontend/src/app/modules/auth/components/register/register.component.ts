import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationResponse, RegisterDto } from '../../models/auth.models';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { firstUppercaseValidator } from 'src/app/shared/validators/firstUppercase';
import { passwordStrengthValidator } from 'src/app/shared/validators/passwordStrength';
import { equalToValidator } from 'src/app/shared/validators/equalTo';
import { GenericValidatorComponent } from 'src/app/shared/components/generic-validator.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent extends GenericValidatorComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private formbuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    super();

    this.validationMessages = {
      name: {
        required: 'The field is required',
        minlength: 'The field must be greater than 3 characters',
        firstLetterUppercase: 'The first letter needs to be uppercase'
      },
      email: {
        required: 'The field is required',
        email: 'The email is invalid'
      },
      userName: {
        required: 'The field is required',
        minlength: 'The field must be between 6 and 15 characters'
      },
      password: {
        required: 'The field is required',
        passwordStrength: 'The password needs an uppercase letter, a number and a special character'
      },
      confirmPassword: {
        required: 'The field is required',
        equalTo: 'The field is not equal to password'
      }
    };
  }

  form: FormGroup
  errors: string[] = [];
  passwordHide: boolean = true;
  confirmPasswordHide: boolean = true;

  ngOnInit(): void {
    const passwordControl = new FormControl('',[Validators.required, passwordStrengthValidator()]);
    const passwordConfirmControl = new FormControl('', [
      Validators.required,
      equalToValidator(passwordControl)
    ]);

    this.form = this.formbuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), firstUppercaseValidator()]],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', [Validators.required, Validators.minLength(6)]],
      password: passwordControl,
      confirmPassword: passwordConfirmControl
    })
  }

  toggleHidePassword(event) {
    event.preventDefault();
    this.passwordHide = !this.passwordHide;
  }

  toggleHideConfirmPassword(event) {
    event.preventDefault();
    this.confirmPasswordHide = !this.confirmPasswordHide;
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
}
