import { Component, OnInit } from '@angular/core';
import { PublisherService } from '../services/publisher.service';
import { Publisher } from '../models/publisher';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  public publisheres: Publisher[];
  errorMessage: string;

  constructor(private publisherService: PublisherService) { }

  ngOnInit(): void {
    this.publisherService.obterTodos()
      .subscribe(
        publisheres => this.publisheres = publisheres,
        error => this.errorMessage);
  }
}
