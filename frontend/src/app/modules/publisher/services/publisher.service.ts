import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { BaseService } from 'src/app/shared/services/base.service';
import { Publisher } from '../models/publisher';
import { CepDetails, Address } from '../models/address';

@Injectable()
export class PublisherService extends BaseService {

    constructor(private http: HttpClient) { super() }

    obterTodos(): Observable<Publisher[]> {
        return this.http
            .get<Publisher[]>(this.apiUrlV1 + "publishers")
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<Publisher> {
        return this.http
            .get<Publisher>(this.apiUrlV1 + `publishers/${id}`, super.getAuthHeaders())
            .pipe(catchError(super.serviceError));
    }

    novoPublisher(publisher: Publisher): Observable<Publisher> {
        return this.http
            .post(this.apiUrlV1 + "publishers", publisher, this.getAuthHeaders())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarPublisher(publisher: Publisher): Observable<Publisher> {
        return this.http
            .put(this.apiUrlV1 + `publishers/${publisher.id}`, publisher, super.getAuthHeaders())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirPublisher(id: string): Observable<Publisher> {
        return this.http
            .delete(this.apiUrlV1 + `publishers/${id}`, super.getAuthHeaders())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    updateAddress(address: Address): Observable<Address> {
        return this.http
            .put(this.apiUrlV1 + `publishers/${address.publisherId}/address`, address, super.getAuthHeaders())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    consultarCep(cep: string): Observable<CepDetails> {
        return this.http
            .get<CepDetails>(`https://viacep.com.br/ws/${cep}/json/`)
            .pipe(catchError(super.serviceError))
    }
}
