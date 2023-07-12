import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { FormsModule, ReactiveFormsModule }  from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxSpinnerModule } from "ngx-spinner";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { MaterialModule } from 'src/app/material.module';
import { PublisherRoutingModule } from './publisher.route';
import { PublisherAppComponent } from './publisher.app.component';
import { PublisherService } from './services/publisher.service';

import { BreadCrumbsComponent } from 'src/app/shared/components/breadcrumbs/breadcrumbs.component';

import { PublisherListComponent } from './components/list/publisher-list.component';
import { PublisherCreateComponent } from './components/create/publisher-create.component';
// import { EditarComponent } from './editar/editar.component';
// import { ExcluirComponent } from './excluir/excluir.component';
// import { DetalhesComponent } from './detalhes/detalhes.component';

import { PublisherResolve } from './services/publisher.resolve';
import { FornececedorGuard } from './services/publisher.guard';


// import { ListaProdutosComponent } from './produtos/lista-produtos.component';

@NgModule({
  declarations: [
    PublisherAppComponent,
    PublisherCreateComponent,
    PublisherListComponent,
    BreadCrumbsComponent,
    // EditarComponent,
    // ExcluirComponent,
    // DetalhesComponent,
    // ListaProdutosComponent
  ],
  imports: [
    CommonModule,
    PublisherRoutingModule,
    FormsModule,
    ReactiveFormsModule,    
    MaterialModule,
    TextMaskModule,
    NgxSpinnerModule,
    A11yModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [
    PublisherService,
    PublisherResolve,
    FornececedorGuard
  ]
})
export class PublisherModule { }
