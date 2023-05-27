import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-menu',
  template: `
    <button title="Admin Security" mat-button [matMenuTriggerFor]="menu">
        <mat-icon>security</mat-icon>
    </button>
    <mat-menu class="menu" #menu="matMenu">
        <a mat-menu-item routerLink="/admin/users">Users</a>
    </mat-menu>
  `,
})

export class AdminMenuComponent {

}
