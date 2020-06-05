import {Injectable, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';


@Injectable({providedIn: 'root'})
export class WebSocketsService {
  baseUrl = environment.baseUrl;
  socket: any;

  constructor() {
    this.socket = io(this.baseUrl);
  }

  receiveMessage() {
    return new Observable(observer => {
      this.socket.on('new-message', (msg => {
        observer.next(msg);
      }));
    });
  }


  sendMessage(data) {
    this.socket.emit('send-message', data);
  }

  emitNewUser(token) {
    this.socket.emit('new-user', {jwt: token});
  }

}
