import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class NotificationService {
  baseUrl = environment.baseUrl;
  token;
  constructor(private http: HttpClient) {
  }

  getToken() {
    this.token = localStorage.getItem('token');
    return localStorage.getItem('token');
  }

  getNotification() {
    return this.http.get(`${this.baseUrl}notification/get-notifications`)
  }

  updateShwittStatus(notification_id) {
    return this.http.post(`${this.baseUrl}notification/shwitt-status`, {notification_id: notification_id});
  }

  updateSubStatus(notification_id) {
    return this.http.post(`${this.baseUrl}notification/subscribe-status`, {notification_id: notification_id});
  }

}

