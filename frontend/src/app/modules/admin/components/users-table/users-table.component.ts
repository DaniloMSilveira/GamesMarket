import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { AdminUser } from '../../models/admin.model';

import { CreateUserComponent } from '../create-user/create-user.component';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../services/admin.service';
import { UserCreateDto } from '../../models/admin.model';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'username', 'email', 'profile', 'actions'];
  dataSource: MatTableDataSource<AdminUser>;

  users: AdminUser[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
    private adminService: AdminService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.adminService.getUsers()
      .subscribe({
        next: (result: AdminUser[]) => {
          this.users = result;
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
    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.ref.detectChanges();
  }

  createUser(dto: UserCreateDto) {
    this.users.push({
      id: `mock-id-${dto.userName}`,
      email: dto.email,
      userName: dto.userName,
      profile: 'guest'
    })
    this.updateDataSource();
    this.toastr.success(
      `You've created the user ${dto.userName}`,
      `Success`
    );
  }

  updateUser(dto: AdminUser) {
    console.log('dto:', dto)
    this.users = this.users.map(user => {
      if (user.userName === dto.userName) {
        return {
          ...user,
          ...dto
        }
      }
      return user
    });
    this.updateDataSource();
    this.toastr.success(
      `You've updated the user ${dto.userName}`,
      `Success`
    );
  }

  deleteUser(username: string) {
    this.users = this.users.filter(item => item.userName !== username);
    this.updateDataSource();
    this.toastr.success(
      `You've deleted the user ${username}`,
      `Success`
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openCreateUserDialog() {
    let dialogRef = this.dialog.open(CreateUserComponent);

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res && res.data) {
        this.createUser(res.data);
      }
    })
  }

  openEditUserDialog(user: AdminUser) {
    let dialogRef = this.dialog.open(EditUserComponent, {
      data: user
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res && res.data) {
        this.updateUser(res.data);
      }
    })
  }

  updateDataSource() {
    this.dataSource.data = this.users;
  }
}