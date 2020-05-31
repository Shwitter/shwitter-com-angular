import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faLocationArrow} from '@fortawesome/free-solid-svg-icons';
import {ChatService} from '../chat.service';

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

  constructor(private chatService: ChatService) {
  }

  ngOnInit(): void {
    this.chatService.receiveMessage().subscribe(msg => {
      console.log(msg);
    });
  }

  closeMessenger() {
    this.closeM.emit();
  }

  sendMessage() {
    this.chatService.sendMessage({message: this.message, receiver: this.username, sender: localStorage.getItem('token')});
  }

}
