import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class ShwittService {
  baseUrl = environment.baseUrl;
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

  getMe() {
    return this.http.get(`${this.baseUrl}user/me`);
  }

  subscribeToUser(user_id) {
    return this.http.post(`${this.baseUrl}user/subscribe`, user_id);
  }

  commentOnShwitt(commentBody) {
    return this.http.post(`${this.baseUrl}comment/create`, commentBody);
  }

  updateComment(updateCommentBody) {
    return this.http.post(`${this.baseUrl}comment/update`, updateCommentBody);
  }

  removeComment(comment_id, removeCommentBody) {
    console.log(removeCommentBody);
    return this.http.post(`${this.baseUrl}comment/delete/${removeCommentBody.comments_id}`, {comments_id: comment_id} );
  }

  likeShwitt(likeBody) {
    return this.http.post(`${this.baseUrl}shweet/like`, likeBody)
  }

  getShwitts() {
    return this.http.get(`${this.baseUrl}shweets`);
  }

  getSubShwitts() {
    return this.http.get(`${this.baseUrl}subscribed-shweets`);
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

