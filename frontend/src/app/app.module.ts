import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ToastrModule } from 'ngx-toastr';

// App
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Material
import { MaterialModule } from './shared/material/material.module';

// Interceptors
import { JwtInterceptorService } from './shared/services/jwt-interceptor.service';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';

// Components
import { AuthorizeViewComponent } from './shared/components/authorize-view/authorize-view.component';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    AuthorizeViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SweetAlert2Module.forRoot(),
    ToastrModule.forRoot()
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
