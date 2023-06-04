import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { BaseService } from 'src/app/services/base.service';
import { Publisher } from '../models/publisher';
import { CepSearch, Endereco } from '../models/address';

@Injectable()
export class PublisherService extends BaseService {

    publisher: Publisher = new Publisher();

    constructor(private http: HttpClient) { super() }

    obterTodos(): Observable<Publisher[]> {
        return this.http
            .get<Publisher[]>(this.UrlServiceV1 + "publisheres")
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<Publisher> {
        return this.http
            .get<Publisher>(this.UrlServiceV1 + "publisheres/" + id, super.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novoPublisher(publisher: Publisher): Observable<Publisher> {
        return this.http
            .post(this.UrlServiceV1 + "publisheres", publisher, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarPublisher(publisher: Publisher): Observable<Publisher> {
        return this.http
            .put(this.UrlServiceV1 + "publisheres/" + publisher.id, publisher, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirPublisher(id: string): Observable<Publisher> {
        return this.http
            .delete(this.UrlServiceV1 + "publisheres/" + id, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarEndereco(endereco: Endereco): Observable<Endereco> {
        return this.http
            .put(this.UrlServiceV1 + "publisheres/endereco/" + endereco.id, endereco, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    consultarCep(cep: string): Observable<CepSearch> {
        return this.http
            .get<CepSearch>(`https://viacep.com.br/ws/${cep}/json/`)
            .pipe(catchError(super.serviceError))
    }
}
