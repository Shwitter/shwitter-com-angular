import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  message: string;

  constructor(private chatService: ChatService, private socketService: WebSocketsService) {
  }

  ngOnInit(): void {
    this.socketService.receiveMessage().subscribe(msg => {
      console.log(msg);
    });
  }

  closeMessenger() {
    this.closeM.emit();
  }

  sendMessage() {
    this.socketService.sendMessage({message: this.message, receiver: this.username, sender: localStorage.getItem('token')});
  }
}
