import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserCreateDto } from '../../models/admin.model';

@Component({
  selector: 'dialog-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  constructor(
    private formbuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateUserComponent>
  ) { }

  form: FormGroup

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

  cancel() {
    this.dialogRef.close({ data: null })
  }

  submit(dto: UserCreateDto) {
    this.dialogRef.close({ data: dto })
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
