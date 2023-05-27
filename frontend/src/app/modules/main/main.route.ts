import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

import { UnauthorizedComponent } from 'src/app/shared/components/errors/unauthorized.component';
import { NotFoundComponent } from 'src/app/shared/components/errors/not-found.component';
import { InternalErrorComponent } from 'src/app/shared/components/errors/internal.component';
import { AdminGuard } from 'src/app/shared/guards/admin.guard';

const routerConfig: Routes = [
    {
        path: '', 
        component: HomeComponent,
        children: [
            { 
                path: 'admin',
                canActivate: [AdminGuard],
                loadChildren: () => import('../admin/admin.module')
                    .then(m => m.AdminModule)
            },
            // { 
            //     path: 'games',
            //     loadChildren: () => import('../games/games.module')
            //         .then(m => m.GamesModule)
            // },
            { path: '403', component: UnauthorizedComponent },
            { path: '404', component: NotFoundComponent },
            { path: '500', component: InternalErrorComponent },
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig)
    ],
    exports: [RouterModule]
})
export class MainRoutingModule { }