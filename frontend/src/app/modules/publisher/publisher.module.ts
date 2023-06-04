import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovoComponent } from './novo/novo.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { PublisherRoutingModule } from './publisher.route';
import { PublisherAppComponent } from './publisher.app.component';
import { ListaComponent } from './lista/lista.component';
import { PublisherService } from './services/publisher.service';

import { TextMaskModule } from 'angular2-text-mask';
import { NgxSpinnerModule } from "ngx-spinner";

import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { PublisherResolve } from './services/publisher.resolve';
import { FornececedorGuard } from './services/publisher.guard';
import { ListaProdutosComponent } from './produtos/lista-produtos.component';

@NgModule({
  declarations: [
    PublisherAppComponent,
    NovoComponent,
    ListaComponent,
    EditarComponent,
    ExcluirComponent,
    DetalhesComponent,
    ListaProdutosComponent
  ],
  imports: [
    CommonModule,
    PublisherRoutingModule,
    FormsModule,
    ReactiveFormsModule,    
    TextMaskModule,
    NgxSpinnerModule
  ],
  providers: [
    PublisherService,
    PublisherResolve,
    FornececedorGuard
  ]
})
export class PublisherModule { }
