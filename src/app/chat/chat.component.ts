import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {faEnvelope, faEnvelopeOpen} from '@fortawesome/free-solid-svg-icons';
import {animate, group, state, style, transition, trigger} from '@angular/animations';
import {ChatService} from './chat.service';
import {AuthService} from '../user/userServices/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less'],
  animations: [
    trigger('slideInOut', [
      state('in', style({height: '*', opacity: 0})),
      transition(':leave', [
        style({height: '*', opacity: 1}),

        group([
          animate(300, style({height: 0})),
          animate('200ms ease-in-out', style({opacity: '0'}))
        ])

      ]),
      transition(':enter', [
        style({height: '0', opacity: 0}),

        group([
          animate(300, style({height: '*'})),
          animate('400ms ease-in-out', style({opacity: '1'}))
        ])

      ])
    ])
  ]
})
export class ChatComponent implements OnInit {
  envelopeOpenText = faEnvelopeOpen;
  envelopeIcon = faEnvelope;
  @Output() showMessenger: EventEmitter<any> = new EventEmitter<any>();
  showChat = false;
  users: any = [];

  constructor(private chatService: ChatService, public userService: AuthService) {
  }

  ngOnInit(): void {
    this.chatService.getUserList().subscribe(users => {
      this.users = users;
      const username = localStorage.getItem('username');
      this.users = this.users.filter(x => x.username !== username);
      // console.log(this.users);
    });
  }

  showChatBox() {
    this.showChat = true;
  }

  closeChat() {
    this.showChat = false;
  }

  onShowMessenger(name) {
    this.showMessenger.emit({
      show: true,
      username: name
    });
  }

}
