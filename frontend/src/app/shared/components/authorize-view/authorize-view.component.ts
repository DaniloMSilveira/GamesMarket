import { Component, Input, OnInit } from '@angular/core';

import { LocalStorageUtils } from 'src/app/shared/storage/local-storage';

@Component({
  selector: 'app-authorize-view',
  templateUrl: './authorize-view.component.html',
  styleUrls: ['./authorize-view.component.scss']
})
export class AuthorizeViewComponent implements OnInit {

  localStorageUtils = new LocalStorageUtils();

  ngOnInit(): void {
  }

  @Input()
  role: string;

  public isAuthorized(){
    if (this.role){
      return this.localStorageUtils.getRole() === this.role;
    } else{
      return this.localStorageUtils.isAuthenticated();
    }
  }

}
