import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parseWebAPIErrors } from 'src/app/shared/utils';
import { UserCreateDTO } from '../../security.models';
import { SecurityService } from '../../security.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private formbuilder: FormBuilder,
    private securityService: SecurityService,
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

  register(userCreateDTO: UserCreateDTO){
    this.errors = [];
    this.securityService.register(userCreateDTO).subscribe(authenticationResponse => {
      this.securityService.saveToken(authenticationResponse);
      this.router.navigate(['/home']);
    }, error => this.errors = parseWebAPIErrors(error));
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
