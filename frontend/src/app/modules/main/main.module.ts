import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { MaterialModule } from "src/app/shared/material/material.module";

import { MainRoutingModule } from "./main.route";

import { AuthorizeViewComponent } from '../../shared/components/authorize-view/authorize-view.component';
import { ErrorCodeComponent } from "src/app/shared/components/errors/error-code/error-code.component";
import { UnauthorizedComponent } from 'src/app/shared/components/errors/unauthorized.component';
import { NotFoundComponent } from 'src/app/shared/components/errors/not-found.component';
import { InternalErrorComponent } from 'src/app/shared/components/errors/internal.component';

import { HomeComponent } from "./components/home/home.component";
import { MenuComponent } from "./components/menu/menu.component";
import { UserMenuComponent } from "./components/menu/user-menu.component";
import { AdminMenuComponent } from "./components/menu/admin-menu.component";


@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent,
    UserMenuComponent,
    AdminMenuComponent,
    AuthorizeViewComponent,
    ErrorCodeComponent,
    UnauthorizedComponent,
    NotFoundComponent,
    InternalErrorComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MainRoutingModule,
    MaterialModule,
  ]
})
export class MainModule { }