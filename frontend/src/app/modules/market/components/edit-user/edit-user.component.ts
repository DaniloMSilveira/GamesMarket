import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminUser } from '../../models/admin.model';

@Component({
  selector: 'dialog-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  constructor(
    private formbuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) private data: AdminUser
  ) { }

  user?: AdminUser
  form: FormGroup
  disabledInputs = []

  ngOnInit(): void {
    this.user = this.data;
    this.form = this.formbuilder.group({
      id: [this.user.id, {
        validators: [Validators.required]
      }],
      userName: [this.user.userName, {
        validators: [Validators.required]
      }],
      email: [this.user.email, {
        validators: [Validators.required, Validators.email]
      }],
      profile: [this.user.profile]
    })

    this.disabledInputs = [
      this.form.get('id'),
      this.form.get('userName')
    ]
    this.handleDisableInputs('disable')
  }

  handleDisableInputs(action: string) {
    if (action === 'enable') {
      this.disabledInputs.map(item => item.enable())
    } else {
      this.disabledInputs.map(item => item.disable())
    }
  }

  cancel() {
    this.dialogRef.close({ data: null })
  }

  submit() {
    this.handleDisableInputs('enable')
    this.dialogRef.close({ data: this.form.value })
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
