import { Component, Input, OnInit } from '@angular/core';
import { BreadCrumbModel } from './breadcrumb.model';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadCrumbsComponent implements OnInit {

  constructor() { }

  @Input()
  breadcrumbs: BreadCrumbModel[] = [];

  ngOnInit(): void {
  }

}
