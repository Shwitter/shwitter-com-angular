import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptorService} from './userServices/auth-interceptor.service';
import { ChangePasswordComponent } from './change-password/change-password.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
export class UserModule { }
