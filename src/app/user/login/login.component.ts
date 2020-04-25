import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  userLoginForm: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    this.userLoginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  login() {
    console.log(this.userLoginForm.value);
  }
}
