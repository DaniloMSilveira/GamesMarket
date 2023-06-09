import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AuthRoutingModule } from "./auth.route";

import { AuthService } from "./services/auth.service";

import { MaterialModule } from "src/app/material.module";
import { DisplayErrorsComponent } from "src/app/shared/components/display-errors/display-errors.component";

import { AuthenticationFormComponent } from "./components/authentication-form/authentication-form.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { A11yModule } from "@angular/cdk/a11y";


@NgModule({
    declarations: [
      AuthenticationFormComponent,
      LoginComponent,
      RegisterComponent,
      DisplayErrorsComponent
    ],
    imports: [
      CommonModule,
      RouterModule,
      AuthRoutingModule,
      MaterialModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      A11yModule
    ],
    providers: [
      AuthService
    ]
  })
  export class AuthModule { }