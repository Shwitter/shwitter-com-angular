import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ShwittService {
  baseUrl = 'http://api.shwitter.localhost/';
  token;
  constructor(private http: HttpClient) {
  }

  getToken() {
    this.token = localStorage.getItem('token');
    return localStorage.getItem('token');
  }

  createShwitt(shwittBody) {
    return this.http.post(`${this.baseUrl}shweet/create`, shwittBody);
  }

  likeShwitt(likeBody) {
    return this.http.post(`${this.baseUrl}shweet/like`, likeBody)
  }

  getShwitts() {
    return this.http.get(`${this.baseUrl}shweets/`, {
      headers: this.token
    });
  }

  getComments() {

  }

  // login(loginBody) {
  //   return this.http.post(`${this.baseUrl}user/login`, loginBody);
  // }
  //
  // register(registerBody) {
  //   return this.http.post(`${this.baseUrl}user/register`, registerBody);
  // }
}

