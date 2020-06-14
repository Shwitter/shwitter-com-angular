import { Component } from '@angular/core';
import {environment} from '../environments/environment';
import * as io from 'socket.io-client';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'shwitter';
  showMessenger = false;
  username: string;
  socket: any;
  baseUrl = environment.baseUrl;


  constructor() {
    this.socket = io(this.baseUrl);
  }

  onShowMessenger(event: any) {
    this.showMessenger = event.show;
    this.username = event.username;
    this.socket.emit('old-messages', {sender: localStorage.getItem('token'), receiver: this.username});
    console.log(event);
  }

  onCloseMessenger() {
    this.showMessenger = false;
  }
}
