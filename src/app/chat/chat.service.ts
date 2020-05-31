import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ChatService {
  baseUrl = environment.baseUrl;
  socket: any;

  constructor(private http: HttpClient) {
    this.socket = io(this.baseUrl);
  }

  getUserList() {
    return this.http.get(`${this.baseUrl}user/userList`);
  }


  receiveMessage() {
    return new Observable(observer => {
      this.socket.on('new message', (msg => {
        observer.next(msg);
      }));
    });
  }


  sendMessage(data) {
    this.socket.emit('send-message', data);
  }


}

