import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../userServices/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.less']
})
export class ChangePasswordComponent implements OnInit {
  userChangePasswordForm: FormGroup;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userChangePasswordForm = new FormGroup({
      currentPassword: new FormControl('', [Validators.email, Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

  changePassword() {
    this.authService.changePassword({
      password: this.userChangePasswordForm.value.currentPassword,
      newpass: this.userChangePasswordForm.value.newPassword,
    }).subscribe(res => {
      console.log(res);
    });
  }

}
