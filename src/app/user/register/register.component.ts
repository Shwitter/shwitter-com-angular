import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../userServices/auth.service';
import {Router} from '@angular/router';
import {WebSocketsService} from '../../shared/services/webSockets.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {
  userRegisterForm: FormGroup;
  errorMessage = '';
  loading = false;

  constructor(private authService: AuthService,
              private router: Router,
              private socketService: WebSocketsService) {
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['']);
    }
    this.userRegisterForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
      repeatPassword: new FormControl('', [Validators.required])
    });
  }


  register(event: any) {
    this.loading = true;
    this.errorMessage = '';
    event.target.disabled = true;
    event.target.innerHTML = `Sign In &nbsp;<img style="width: 18px" src="assets/images/loading.gif" alt="">`;
    this.authService.register({
      username: this.userRegisterForm.value.username,
      email: this.userRegisterForm.value.email,
      password: this.userRegisterForm.value.password
    }).subscribe((res: any) => {
      this.loading = false;
      event.target.disabled = false;
      event.target.innerHTML = `Sign Up`;
      localStorage.setItem('token', res.token);
      this.socketService.emitNewUser(res.token);
      localStorage.setItem('username', this.userRegisterForm.value.username);
      this.router.navigate(['']);
    }, error => {
      this.loading = false;
      event.target.disabled = false;
      event.target.innerHTML = `Sign Up`;
      this.errorMessage = error.error.message;
    });
  }
}
