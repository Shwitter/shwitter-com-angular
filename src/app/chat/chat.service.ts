import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class ChatService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getUserList() {
    return this.http.get(`${this.baseUrl}user/userList`);
  }
}

