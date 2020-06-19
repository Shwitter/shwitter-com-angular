import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../user/userServices/auth.service';
import {Router} from '@angular/router';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {faBell} from '@fortawesome/free-solid-svg-icons';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../notificationService/notification.service';
import { WebSocketsService } from '../../shared/services/webSockets.service'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  newNotification = true;
  showNotifications = false;
  notificationArr;
  count;
  // notificationArr = [
  //   {
  //     invoker: 'anano',
  //     type: 'liked',
  //   },
  //   {
  //     invoker: 'anano',
  //     type: 'subscribe',
  //   },
  //   {
  //     invoker: 'anano',
  //     type: 'shwitte',
  //     notification_id: '5eebdae7ebf75a0169891445'
  //   },
  //   {
  //     invoker: 'anano',
  //     type: 'comment',
  //     notification_id: '5eebdae7ebf75a0169891445'
  //   }
  // ];
  userIcon = faUser;
  notificationIcon = faBell;
  token = localStorage.getItem('token');
  constructor(public authService: AuthService, private router: Router, private http: HttpClient, private NotificationService: NotificationService, private WebSocketsService: WebSocketsService) {
  }

  ngOnInit(): void {
    this.WebSocketsService.getNotificationCount().subscribe((res : any) => {
      this.count = res.count;
    });

    this.WebSocketsService.notificationsCount().subscribe((res : any) => {
      debugger
      this.count = res;
    })
  }

  updateShwittStatus(notification_id) {
    this.NotificationService.updateShwittStatus(notification_id).subscribe((res : any) => {
      console.log(res);
    });
    this.showNotifications = false;
  }

  getNotifications() {
    this.showNotifications = !this.showNotifications;
    if(this.showNotifications === true) {
      return this.NotificationService.getNotification().subscribe((res : any) => {
        if(res.error === true) {
          this.newNotification = false;
        } else {
          this.newNotification = true;
          this.notificationArr = res;

          let notification_ids = [];
          this.notificationArr.forEach(notification => {
            if( notification.type === 'subscribe') {
              notification_ids.push(notification.notification_id);
            }
          });
          this.NotificationService.updateSubStatus(notification_ids).subscribe(res =>{})
        }
      });
    }

  }

  getUserName() {
    return localStorage.getItem('username');

  }

  signOut() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

}
