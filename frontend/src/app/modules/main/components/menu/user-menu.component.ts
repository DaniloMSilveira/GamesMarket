import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LocalStorageUtils } from 'src/app/shared/storage/local-storage';

@Component({
  selector: 'app-user-menu',
  template: `
      <button mat-button [matMenuTriggerFor]="menu">
        <div class="flex items-center justify-center w-32 h-6 mt-1 bg-white p-0.5 rounded-full">
          <img matButtonIcon class="avatar r-full" [src]="avatar" width="24" alt="avatar" />
          <span class="m-x-8">{{ user }}</span>
        </div>
      </button>

      <mat-menu #menu="matMenu">
        <button routerLink="" mat-menu-item>
          <mat-icon>account_circle</mat-icon>
          <span>Profile</span>
        </button>
        <app-authorize-view [role]="'admin'">
          <ng-container authorized>
            <button routerLink="/admin/users" mat-menu-item>
              <mat-icon>security</mat-icon>
              <span>Admin</span>
            </button>
          </ng-container>
        </app-authorize-view>
        <button mat-menu-item (click)="logout()">
          <mat-icon>exit_to_app</mat-icon>
          <span>Logout</span>
        </button>
      </mat-menu>
  `,
  styles: [
    `
      .avatar {
        width: 18px;
        height: 18px;
        margin-right: 6px;
        border-radius: 50px;
      }
    `,
  ],
})

export class UserMenuComponent implements OnInit {
  localStorageUtils = new LocalStorageUtils();

  user!: any;
  avatar: string = '../../../../../assets/avatar.webp'

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.localStorageUtils.getUserName();
  }

  logout(): void {
    this.localStorageUtils.removeUserInfo();
    this.router.navigate(['/auth/login'])
  }
}
