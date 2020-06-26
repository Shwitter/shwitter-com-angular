import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {faLocationArrow} from '@fortawesome/free-solid-svg-icons';
import {ChatService} from '../chat.service';
import {WebSocketsService} from '../../shared/services/webSockets.service';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.less'],
})
export class MessageBoxComponent implements OnInit {
  sendArrow = faLocationArrow;
  @Output() closeM: EventEmitter<any> = new EventEmitter<any>();
  @Input() username: string;
  @ViewChild('scroll') private myScrollContainer: ElementRef;
  message: string;
  messages = [];

  constructor(private chatService: ChatService, private socketService: WebSocketsService) {
  }

  ngOnInit(): void {
    this.socketService.receiveMessage().subscribe(msg => {
      this.messages.push(msg);
    });
    this.socketService.getOldMessages().subscribe((msg: any) => {
      this.messages.push(...msg);
    });
  }

  closeMessenger() {
    this.closeM.emit();
  }

  sendMessage() {
    const msg = {message: this.message, receiver: this.username, sender: localStorage.getItem('token')};
    this.messages.push(msg);
    this.message = '';
    this.socketService.sendMessage(msg);
  }
}
