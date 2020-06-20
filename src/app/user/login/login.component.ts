import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../userServices/auth.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {WebSocketsService} from '../../shared/services/webSockets.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  userLoginForm: FormGroup;
  errorMessage = '';
  loading = false;
  socket: any;
  baseUrl = environment.baseUrl;


  constructor(private authService: AuthService, private router: Router, private socketService: WebSocketsService) {
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['']);
    }
    this.userLoginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });

  }

  login(event: any) {
    this.loading = true;
    event.target.disabled = true;
    event.target.innerHTML = `Sign In &nbsp;<img style="width: 18px" src="assets/images/loading.gif" alt="">`;
    this.errorMessage = '';
    this.authService.login(
      {
        username: this.userLoginForm.value.username,
        password: this.userLoginForm.value.password
      }
    ).subscribe((res: any) => {
      this.loading = false;
      event.target.disabled = false;
      event.target.innerHTML = `Sign In`;
      localStorage.setItem('token', res.token);
      this.socketService.emitNewUser(res.token);
      // this.socket.emit('new-user', {jwt: res.token});
      localStorage.setItem('username', this.userLoginForm.value.username);
      this.router.navigate(['']);
    }, error => {
      this.loading = false;
      event.target.disabled = false;
      event.target.innerHTML = `Sign In`;
      this.errorMessage = error.error.message;
    });
  }
}
