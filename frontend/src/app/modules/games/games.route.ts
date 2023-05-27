import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexGamesComponent } from './components/index-games/index-games.component';
import { CreateGameComponent } from './components/create-game/create-game.component';
import { EditGameComponent } from './components/edit-game/edit-game.component';

const routerConfig: Routes = [
    {
        path: '', 
        component: IndexGamesComponent,
        children: [
            {path: 'create', component: CreateGameComponent},
            {path: 'edit/:id', component: EditGameComponent},
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig)
    ],
    exports: [RouterModule]
})
export class GamesRoutingModule { }