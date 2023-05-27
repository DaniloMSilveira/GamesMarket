import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminAppComponent } from './admin.app.component';
import { UsersTableComponent } from './components/users-table/users-table.component';

const routerConfig: Routes = [
    {
        path: '', component: AdminAppComponent,
        children: [
            { path: 'users', component: UsersTableComponent },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig)
    ],
    exports: [RouterModule]
})
export class AdminRoutingModule { }