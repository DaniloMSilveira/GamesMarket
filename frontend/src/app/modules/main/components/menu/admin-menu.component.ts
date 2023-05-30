import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-menu',
  template: `
    <a routerLink="/admin/users" title="Admin" mat-button>
      <mat-icon>security</mat-icon>
    </a>
  `,
})

export class AdminMenuComponent {

}
