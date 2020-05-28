import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'shwitter';
  showMessenger = false;

  onShowMessenger(show: boolean) {
    this.showMessenger = show;
  }

  onCloseMessenger() {
    this.showMessenger = false;
  }
}
