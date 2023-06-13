import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnauthorizedComponent } from 'src/app/shared/components/errors/unauthorized.component';
import { NotFoundComponent } from 'src/app/shared/components/errors/not-found.component';
import { InternalErrorComponent } from 'src/app/shared/components/errors/internal.component';

// Guards
import { ActiveGuard } from './shared/guards/active.guard';

const routes: Routes = [
  { 
    path: '', 
    canActivate: [ActiveGuard],
    loadChildren: () => import('./modules/main/main.module')
      .then(m => m.MainModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module')
      .then(m => m.AuthModule)
  },
  { 
    path: 'access-denied', 
    component: UnauthorizedComponent 
  },
  { 
    path: 'not-found', 
    component: NotFoundComponent 
  },
  { 
    path: '500', 
    component: InternalErrorComponent 
  },
  {
    path: '**', 
    redirectTo: 'not-found',
    pathMatch: 'full'
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
