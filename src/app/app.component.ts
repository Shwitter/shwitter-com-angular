import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'shwitter';
  showMessenger = false;
  username: string;

  onShowMessenger(event: any) {
    this.showMessenger = event.show;
    this.username = event.username;
    console.log(event);
  }

  onCloseMessenger() {
    this.showMessenger = false;
  }
}
