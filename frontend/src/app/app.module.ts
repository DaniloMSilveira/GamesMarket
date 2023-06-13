import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ToastrModule } from 'ngx-toastr';

// App
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Material
import { MaterialModule } from './material.module';

// Interceptors
import { ErrorInterceptor } from './shared/services/error-handler.service';

// Errors
import { ErrorCodeComponent } from "src/app/shared/components/errors/error-code/error-code.component";
import { UnauthorizedComponent } from 'src/app/shared/components/errors/unauthorized.component';
import { NotFoundComponent } from 'src/app/shared/components/errors/not-found.component';
import { InternalErrorComponent } from 'src/app/shared/components/errors/internal.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    ErrorCodeComponent,
    UnauthorizedComponent,
    NotFoundComponent,
    InternalErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SweetAlert2Module.forRoot(),
    ToastrModule.forRoot({
      closeButton: true,
      progressBar: true,
    })
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
