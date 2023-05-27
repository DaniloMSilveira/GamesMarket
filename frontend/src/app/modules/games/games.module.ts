import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MaterialModule } from "src/app/shared/material/material.module";
import { GamesRoutingModule } from "./games.route";
import { GamesService } from "./services/games.service";

import { IndexGamesComponent } from './components/index-games/index-games.component';
import { CreateGameComponent } from './components/create-game/create-game.component';
import { EditGameComponent } from './components/edit-game/edit-game.component';


@NgModule({
  declarations: [
    IndexGamesComponent,
    CreateGameComponent,
    EditGameComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    GamesRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    GamesService
  ]
})
export class GamesModule { }