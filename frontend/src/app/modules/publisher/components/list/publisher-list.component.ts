import { Component, OnInit } from '@angular/core';
import { PublisherService } from '../../services/publisher.service';
import { Publisher } from '../../models/publisher';

@Component({
  selector: 'app-publisher-list',
  templateUrl: './publisher-list.component.html'
})
export class PublisherListComponent implements OnInit {

  public publishers: Publisher[];
  errorMessage: string;

  constructor(private publisherService: PublisherService) { }

  ngOnInit(): void {
    this.publisherService.obterTodos()
      .subscribe(
        publishers => this.publishers = publishers,
        error => this.errorMessage);
  }
}
