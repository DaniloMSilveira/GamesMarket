import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PublisherService } from '../../services/publisher.service';
import { Publisher } from '../../models/publisher';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-publisher-list',
  templateUrl: './publisher-list.component.html'
})
export class PublisherListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'typePerson', 'document', 'email', 'actions'];
  dataSource: MatTableDataSource<Publisher>;

  public publishers: Publisher[];
  errorMessage: string;

  constructor(
    private publisherService: PublisherService,
    private toastr: ToastrService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.publisherService.getAll()
      .subscribe({
        next: (result: Publisher[]) => {
          this.publishers = result;
          this.updateDataSource();
        },
        error: (e) => {
          this.toastr.error(
            'Internal error. Please try again later', 
            'Error on authentication',
          );
        }
      })
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.publishers);
    this.ref.detectChanges();
  }

  updateDataSource() {
    this.dataSource.data = this.publishers;
  }

  deletePublisher(id: string) {
    this.publisherService.deletePublisher(id)
      .subscribe({
        next: (result: any) => {
          this.toastr.success(
            'Publisher has deleted!',
            'Success'
          );
          this.publishers = this.publishers.filter(item => item.id !== id);
          this.updateDataSource();
        },
        error: (e) => {
          this.toastr.error(
            'Internal error. Please try again later', 
            'Error on authentication',
          );
        }
      })
  }
}
