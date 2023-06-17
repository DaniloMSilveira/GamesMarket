import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublisherAppComponent } from './publisher.app.component';
import { PublisherListComponent } from './components/list/publisher-list.component';
import { PublisherCreateComponent } from './components/create/publisher-create.component';
// import { EditarComponent } from './editar/editar.component';
// import { DetalhesComponent } from './detalhes/detalhes.component';
// import { ExcluirComponent } from './excluir/excluir.component';
import { PublisherResolve } from './services/publisher.resolve';
import { FornececedorGuard } from './services/publisher.guard';

const publisherRouterConfig: Routes = [
    {
        path: '', component: PublisherAppComponent,
        children: [
            { path: 'list', component: PublisherListComponent },
            {
                path: 'create', component: PublisherCreateComponent,
                // canDeactivate: [FornececedorGuard],
                // canActivate: [FornececedorGuard],
                // data: [{ claim: { nome: 'Publisher', valor: 'Adicionar'}}]
            },
            // {
            //     path: 'editar/:id', component: EditarComponent,
            //     canActivate: [FornececedorGuard],
            //     data: [{ claim: { nome: 'Publisher', valor: 'Atualizar' } }],
            //     resolve: {
            //         publisher: PublisherResolve
            //     }
            // },
            // {
            //     path: 'detalhes/:id', component: DetalhesComponent,
            //     resolve: {
            //         publisher: PublisherResolve
            //     }
            // },
            // {
            //     path: 'excluir/:id', component: ExcluirComponent,
            //     canActivate: [FornececedorGuard],
            //     data: [{ claim: { nome: 'Publisher', valor: 'Excluir' } }],
            //     resolve: {
            //         publisher: PublisherResolve
            //     }
            // }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(publisherRouterConfig)
    ],
    exports: [RouterModule]
})
export class PublisherRoutingModule { }