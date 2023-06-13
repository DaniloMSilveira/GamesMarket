import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { MaterialModule } from "src/app/material.module";

import { MainRoutingModule } from "./main.route";

import { AuthorizeViewComponent } from '../../shared/components/authorize-view/authorize-view.component';

import { HomeComponent } from "./components/home/home.component";
import { BodyComponent } from "./components/body/body.component";
import { MenuComponent } from "./components/menu/menu.component";
import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { SublevelMenuComponent } from "./components/sidenav/sublevel-menu.component";
import { UserMenuComponent } from "./components/menu/user-menu.component";


@NgModule({
  declarations: [
    HomeComponent,
    BodyComponent,
    MenuComponent,
    SidenavComponent,
    SublevelMenuComponent,
    UserMenuComponent,
    AuthorizeViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MainRoutingModule,
    MaterialModule,
  ]
})
export class MainModule { }