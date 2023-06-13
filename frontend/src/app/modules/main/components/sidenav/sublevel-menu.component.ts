import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { fadeInOut, submenu } from './animations';
import { INavbarData } from './models/sidenav.model';

@Component({
  selector: 'app-sublevel-menu',
  template: `
    <ul *ngIf="collapsed && data.items && data.items.length > 0"
    [@submenu]="expanded
      ? {value: 'visible', 
          params: {transitionParams: '400ms cubic-bezier(0.86, 0, 0.07, 1)', height: '*'}}
      : {value: 'hidden', 
          params: {transitionParams: '400ms cubic-bezier(0.86, 0, 0.07, 1)', height: '0'}}"
      class="sublevel-nav"
    >
      <li *ngFor="let item of data.items" class="sublevel-nav-item">
          <a class="sublevel-nav-link"
          (click)="handleClick(item)"
            *ngIf="item.items && item.items.length > 0"
            [ngClass]="getActiveClass(item)"
          >
            <mat-icon class="sublevel-link-icon">circle</mat-icon>
            <!-- <i class="sublevel-link-icon fa fa-circle"></i> -->
            <span class="sublevel-link-text" @fadeInOut 
                *ngIf="collapsed">{{item.label}}</span>
            <mat-icon *ngIf="item.items && collapsed" class="menu-collapse-icon">
              {{!data.expanded ? 'arrow_right' : 'arrow_drop_down'}}
            </mat-icon>
          </a>
          <a class="sublevel-nav-link"
            *ngIf="!item.items || (item.items && item.items.length === 0)"
            [routerLink]="[item.routeLink]"
            routerLinkActive="active-sublevel"
            [routerLinkActiveOptions]="{exact: true}"
          >
            <!-- <i class="sublevel-link-icon fa fa-circle"></i> -->
            <mat-icon class="sublevel-link-icon">circle</mat-icon>
            <span class="sublevel-link-text" @fadeInOut 
               *ngIf="collapsed">{{item.label}}</span>
          </a>
          <div *ngIf="item.items && item.items.length > 0">
            <app-sublevel-menu
              [data]="item"
              [collapsed]="collapsed"
              [multiple]="multiple"
              [expanded]="item.expanded"
            ></app-sublevel-menu>
          </div>
      </li>
    </ul>
  `,
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    fadeInOut,
    submenu
  ]
})
export class SublevelMenuComponent implements OnInit {

  @Input() data: INavbarData = {
    routeLink: '',
    icon: '',
    label: '',
    items: []
  }
  @Input() collapsed = false;
  @Input() animating: boolean | undefined;
  @Input() expanded: boolean | undefined;
  @Input() multiple: boolean = false;

  constructor(public router: Router) {}

  ngOnInit(): void {
  }

  handleClick(item: any): void {
    if (!this.multiple) {
      if (this.data.items && this.data.items.length > 0) {
        for(let modelItem of this.data.items) {
          if (item !==modelItem && modelItem.expanded) {
            modelItem.expanded = false;
          }
        }
      }
    }
    item.expanded = !item.expanded;
  }

  getActiveClass(item: INavbarData): string {
    return item.expanded && this.router.url.includes(item.routeLink) 
      ? 'active-sublevel' 
      : '';
  }

}
