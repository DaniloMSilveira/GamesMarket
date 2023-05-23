import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthLocalStorage } from '../shared/storage/auth-local-storage';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  authLocalStorage = new AuthLocalStorage();

  constructor(
    private router: Router
  ) { }

  user: any

  ngOnInit(): void {
    const userInfo = this.authLocalStorage.getUserInfo();

    if (userInfo) {
      this.user = JSON.parse(userInfo);
    }
  }

  logout(): void {
    this.authLocalStorage.removeUserInfo();
    this.router.navigate(['/auth/login'])
  }

}
