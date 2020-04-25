import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../user/userServices/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  signOut() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

}
