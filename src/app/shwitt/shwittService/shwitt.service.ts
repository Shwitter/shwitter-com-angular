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

  commentOnShwitt(commentBody) {
    return this.http.post(`${this.baseUrl}comment/create`, commentBody);
  }

  updateComment(updateCommentBody) {
    return this.http.post(`${this.baseUrl}comment/update`, updateCommentBody);
  }

  removeComment(removeCommentBody) {
    return this.http.delete(`${this.baseUrl}comment/delete/` + removeCommentBody.comment_id);
  }

  likeShwitt(likeBody) {
    return this.http.post(`${this.baseUrl}shweet/like`, likeBody)
  }

  getShwitts() {
    return this.http.get(`${this.baseUrl}shweets/`, {
      headers: this.token
    });
  }

  subToUser() {
    // return this.http.post(`${this.baseUrl}`)
  }

  // login(loginBody) {
  //   return this.http.post(`${this.baseUrl}user/login`, loginBody);
  // }
  //
  // register(registerBody) {
  //   return this.http.post(`${this.baseUrl}user/register`, registerBody);
  // }
}

