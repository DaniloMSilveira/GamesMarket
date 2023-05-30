import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LocalStorageUtils } from 'src/app/shared/storage/local-storage';

@Component({
  selector: 'app-user-menu',
  template: `
    <button class="r-full" mat-button [matMenuTriggerFor]="menu">
      <img matButtonIcon class="avatar r-full" [src]="avatar" width="24" alt="avatar" />
      <span class="m-x-8">{{ user }}</span>
    </button>

    <mat-menu #menu="matMenu">
      <button routerLink="" mat-menu-item>
        <mat-icon>account_circle</mat-icon>
        <span>Profile</span>
      </button>
      <button mat-menu-item (click)="logout()">
        <mat-icon>exit_to_app</mat-icon>
        <span>Logout</span>
      </button>
    </mat-menu>
  `,
  styles: [
    `
      .avatar {
        width: 24px;
        height: 24px;
        margin-right: 8px;
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
