import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, CanDeactivate } from '@angular/router';

import { BaseGuard } from 'src/app/shared/guards/base.guard';

import { PublisherCreateComponent } from '../components/create/publisher-create.component';

@Injectable()
export class FornececedorGuard extends BaseGuard implements CanActivate, CanDeactivate<PublisherCreateComponent> {

    constructor(protected override router: Router) { super(router); }

    canDeactivate(component: PublisherCreateComponent) {
        if(component.mudancasNaoSalvas) {
            return window.confirm('Tem certeza que deseja abandonar o preenchimento do formulario?');
        }        
        return true
    }

    canActivate(routeAc: ActivatedRouteSnapshot) {
        return super.validarClaims(routeAc);
    }  
}