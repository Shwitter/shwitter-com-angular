import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {
  userRegisterForm: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    this.userRegisterForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
      repeatPassword: new FormControl('', [Validators.required])
    });
  }


  register() {
    console.log(this.userRegisterForm);
  }

}
