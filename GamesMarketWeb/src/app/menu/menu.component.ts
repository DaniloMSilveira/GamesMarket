import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../security/security.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    private securityService: SecurityService,
    private router: Router
  ) { }

  user: string

  ngOnInit(): void {
    this.user = this.securityService.getFieldFromJWT('userName')
  }

  logout(): void {
    this.securityService.logout();
    this.router.navigate(['/auth/login'])
  }

}
