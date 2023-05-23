import { Component, Input, OnInit } from '@angular/core';

import { AuthLocalStorage } from 'src/app/shared/storage/auth-local-storage';

@Component({
  selector: 'app-authorize-view',
  templateUrl: './authorize-view.component.html',
  styleUrls: ['./authorize-view.component.css']
})
export class AuthorizeViewComponent implements OnInit {

  authLocalStorage = new AuthLocalStorage();

  ngOnInit(): void {
  }

  @Input()
  role: string;

  public isAuthorized(){
    if (this.role){
      return this.authLocalStorage.getRole() === this.role;
    } else{
      return this.authLocalStorage.isAuthenticated();
    }
  }

}
