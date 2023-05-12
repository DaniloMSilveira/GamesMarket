import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Guards
import { AdminGuard } from './guards/admin.guard';
import { ActiveGuard } from './guards/active.guard';

// Security
import { LoginComponent } from './security/components/login/login.component';
import { RegisterComponent } from './security/components/register/register.component';
import { AuthenticationFormComponent } from './security/components/authentication-form/authentication-form.component';

import { HomeComponent } from './home/home.component';
import { IndexGamesComponent } from './games/index-games/index-games.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthenticationFormComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ],
  },
  {
    path: 'home',
    canActivate: [ActiveGuard],
    component: HomeComponent
  },
  {
    path: '**', 
    redirectTo: 'home'
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
