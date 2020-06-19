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

  getOldMessages() {
    return new Observable(observer => {
      this.socket.on('old-messages', msg => {
        observer.next(msg);
      });
    });
  }

  getNewShwitt() {
    return new Observable(observer => {
      this.socket.on('shweet-created', result => {
        observer.next(result);
      })
    });
  };

  getLikes() {
    return new Observable(observer => {
      this.socket.on('shweet-likes-changed', result => {
        observer.next(result);
      })
    })
  };



  getComments() {
    return new Observable(observer => {
      this.socket.on('shweet-comments-added', result => {
        observer.next(result);
      })
    })
  }

  userSubscribed(data) {
    this.socket.emit('user-subscribed', data);
  }

  likeShwitt(data) {
    this.socket.emit('like-shwitt', data);
  }

  notificationCount(data) {
    this.socket.emit('notification-count', data);
  }

  getNotificationCount() {
      return new Observable(observer => {
        this.socket.on('notification-count', result => {
          observer.next(result);
          debugger
        })
      })
  }

  notificationsCount() {
    return new Observable(observer => {
      this.socket.on('notifications-count', result => {
        observer.next(result);
      })
    })
  }

}
