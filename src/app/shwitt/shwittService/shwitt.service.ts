import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ShwittService {
  baseUrl = 'http://616e4573.ngrok.io/';

  constructor(private http: HttpClient) {
  }

  getToken() {
    return localStorage.getItem('token');
  }

  createShwitt(shwittBody) {
    return this.http.post(`${this.baseUrl}user/login`, shwittBody);
  }

  likeShwitt() {
    return this.http.post(`${this.baseUrl}/shweet/like`, {}, {})
  }

  getShwitts() {
    return this.http.get(`${this.baseUrl}/shweets/`+this.getToken());
  }

  // login(loginBody) {
  //   return this.http.post(`${this.baseUrl}user/login`, loginBody);
  // }
  //
  // register(registerBody) {
  //   return this.http.post(`${this.baseUrl}user/register`, registerBody);
  // }
}

