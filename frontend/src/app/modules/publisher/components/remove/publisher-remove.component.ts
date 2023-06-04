import { Component } from '@angular/core';
import { Publisher } from '../models/publisher';

import { ActivatedRoute, Router } from '@angular/router';
import { PublisherService } from '../services/publisher.service';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent {

  publisher: Publisher = new Publisher();
  enderecoMap;
  errors: any[] = [];

  constructor(
    private publisherService: PublisherService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer) {

    this.publisher = this.route.snapshot.data['publisher'];
    this.enderecoMap = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed/v1/place?q=" + this.EnderecoCompleto() + "&key=AIzaSyAP0WKpL7uTRHGKWyakgQXbW6FUhrrA5pE");
  }

  public EnderecoCompleto(): string {
    return this.publisher.endereco.logradouro + ", " + this.publisher.endereco.numero + " - " + this.publisher.endereco.bairro + ", " + this.publisher.endereco.cidade + " - " + this.publisher.endereco.estado;
  }

  excluirEvento() {
    this.publisherService.excluirPublisher(this.publisher.id)
      .subscribe(
        publisher => { this.sucessoExclusao(publisher) },
        error => { this.falha(error) }
      );
  }

  sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Publisher excluido com Sucesso!', 'Good bye :D');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/publisheres/listar-todos']);
      });
    }
  }

  falha(fail) {
    this.errors = fail.error.errors;
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }
}
