import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AdminRoutingModule } from "./admin.route";
import { AdminAppComponent } from "./admin.app.component";
import { UsersTableComponent } from "./components/users-table/users-table.component";
import { MaterialModule } from "src/app/shared/material/material.module";


@NgModule({
  declarations: [
    AdminAppComponent,
    UsersTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
})
export class AdminModule { }