import { Component } from '@angular/core';
import { Publisher } from '../models/publisher';
import { DomSanitizer } from '@angular/platform-browser';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  publisher: Publisher = new Publisher();
  enderecoMap;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer) {

      this.publisher = this.route.snapshot.data['publisher'];
      this.enderecoMap = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed/v1/place?q=" + this.EnderecoCompleto() + "&key=AIzaSyAP0WKpL7uTRHGKWyakgQXbW6FUhrrA5pE");
  }

  public EnderecoCompleto(): string {
    return this.publisher.endereco.logradouro + ", " + this.publisher.endereco.numero + " - " + this.publisher.endereco.bairro + ", " + this.publisher.endereco.cidade + " - " + this.publisher.endereco.estado;
  }
}
