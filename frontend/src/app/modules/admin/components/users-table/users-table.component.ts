import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AdminUser } from '../../models/admin.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'username', 'email', 'roles', 'actions'];
  dataSource: MatTableDataSource<AdminUser>;
  selection = new SelectionModel<AdminUser>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() { }

  ngOnInit(): void {
    const users = [
      {
          "id": "bb9518f1-dba2-46f3-9a51-a3e9c58ed56d",
          "username": "teste",
          "email": "teste@gmail.com",
          "roles": []
      },
      {
          "id": "d8468f1a-34c4-4ac6-a39f-f0ebec5afcb7",
          "username": "danilosilveiraaa",
          "email": "danilosilveira@gmail.com",
          "roles": [
              "admin",
              "guest"
          ]
      }
  ]
    this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}