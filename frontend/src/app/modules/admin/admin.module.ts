import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";

import { AdminRoutingModule } from "./admin.route";
import { AdminAppComponent } from "./admin.app.component";
import { UsersTableComponent } from "./components/users-table/users-table.component";

import { MaterialModule } from "src/app/shared/material/material.module";
import { AdminService } from './services/admin.service';

import { CreateUserComponent } from './components/create-user/create-user.component';
import { EditUserComponent } from "./components/edit-user/edit-user.component";


@NgModule({
  declarations: [
    AdminAppComponent,
    UsersTableComponent,
    CreateUserComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [
    AdminService
  ]
})
export class AdminModule { }