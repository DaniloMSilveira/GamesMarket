import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

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
            {
                path: 'publishers',
                loadChildren: () => import('../publisher/publisher.module')
                    .then(m => m.PublisherModule)
            },
            // {
            //     path: 'market',
            //     loadChildren: () => import('../market/market.module')
            //         .then(m => m.MarketModule)
            // }
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