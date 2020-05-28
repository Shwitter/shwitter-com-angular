import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {faLocationArrow} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.less'],
})
export class MessageBoxComponent implements OnInit {
  sendArrow = faLocationArrow;
  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  closeMessenger() {
    this.close.emit();
  }

}
