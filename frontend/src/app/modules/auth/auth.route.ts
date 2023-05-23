import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationFormComponent } from './components/authentication-form/authentication-form.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routerConfig: Routes = [
    {
        path: '', component: AuthenticationFormComponent,
        children: [
            { 
                path: 'login',
                component: LoginComponent 
            },
            { 
                path: 'register', 
                component: RegisterComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig)
    ],
    exports: [RouterModule]
})
export class AuthRoutingModule { }