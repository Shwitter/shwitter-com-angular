import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class AuthService {
  baseUrl = 'http://6393759888fb.ngrok.io/'; //http://api.shwitter.localhost/

  constructor(private http: HttpClient) {
  }

  login(loginBody) {
    return this.http.post(`${this.baseUrl}user/login`, loginBody);
  }

  register(registerBody) {
    return this.http.post(`${this.baseUrl}user/register`, registerBody);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated() {
    return this.getToken();
  }

  logOut() {
    localStorage.removeItem('token');
  }

  changePassword(changePasswordBody) {
    return this.http.post(`${this.baseUrl}user/change-password`, changePasswordBody);
  }
}
