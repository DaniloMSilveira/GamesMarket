import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { AuthRoutingModule } from "./auth.route";
import { AuthenticationFormComponent } from "./components/authentication-form/authentication-form.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { AuthService } from "./services/auth.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MaterialModule } from "src/app/shared/material/material.module";

@NgModule({
    declarations: [
      AuthenticationFormComponent,
      LoginComponent,
      RegisterComponent
    ],
    imports: [
      CommonModule,
      RouterModule,
      AuthRoutingModule,
      MaterialModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule
    ],
    providers: [
      AuthService
    ]
  })
  export class AuthModule { }