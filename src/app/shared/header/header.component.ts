import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../user/userServices/auth.service';
import {Router} from '@angular/router';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {faBell} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  newNotification;
  showNotifications = false;
  userIcon = faUser;
  notificationIcon = faBell;
  constructor(public authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  getUserName() {
    return localStorage.getItem('username');

  }

  signOut() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

}
