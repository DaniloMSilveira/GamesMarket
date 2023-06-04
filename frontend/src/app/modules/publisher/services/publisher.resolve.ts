import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Publisher } from '../models/publisher';
import { PublisherService } from './publisher.service';

@Injectable()
export class PublisherResolve implements Resolve<Publisher> {

    constructor(private publisherService: PublisherService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.publisherService.obterPorId(route.params['id']);
    }
}