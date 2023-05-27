import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
    path: '**', 
    redirectTo: '',
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
