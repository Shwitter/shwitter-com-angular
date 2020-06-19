import { Component, OnInit, Input } from '@angular/core';
import {ShwittService} from '../../shwittService/shwitt.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { WebSocketsService } from '../../../shared/services/webSockets.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shwitt',
  templateUrl: './shwitt.component.html',
  styleUrls: ['./shwitt.component.less']
})
export class ShwittComponent implements OnInit {
  @Input() shwitt: any;
  @Input() subscribes: any;
  @Input() currentUser: any;

  action = null;
  userComment = null;
  commentOpen = false;
  canUpdate = false;
  subbed = false;
  unsub = false;
  decodedToken;
  likes_length;
  liked;
  token;
  singleShwittId;

  constructor(private shwittService: ShwittService, private WebSocketsService: WebSocketsService, private ActivatedRoute: ActivatedRoute) { }

  handleLikeShwitt(action) {
    this.shwittService.likeShwitt({shweet_id: this.shwitt._id, liked: action}).subscribe((res: any) => {
      this.likes_length = res.likes.length;
      this.liked = res.liked;
      // this.WebSocketsService.likeShwitt({token: this.token }) //TODO:
      this.WebSocketsService.notificationCount({jwt: this.token})
    });
  }

  openComments() {
    this.commentOpen = !this.commentOpen;
  }

  comment() {
    this.shwittService.commentOnShwitt({comment_id: this.shwitt.comments ? this.shwitt.comments._id : null, body: this.userComment, shwitt_id: this.shwitt._id}).subscribe((res: any)=> {
      this.shwitt.comments = res;
      this.userComment = null;
      this.WebSocketsService.notificationCount({jwt: this.token})
    })
  }

  updateComment(comment) {
    let updateCommentBody = {
      comments_id: this.shwitt.comments._id,
      comment_id: comment._id,
      body: comment.body
    }
    this.shwittService.updateComment(updateCommentBody).subscribe(res => {
      if(res) {
        comment.canUpdate = false;
      }
    });
  }

  removeComment(comment) {
    this.shwittService.removeComment(this.shwitt.comments._id,{comments_id: comment._id}).subscribe(res => {
      //TODO:
    })
  }

  // sub/unsub to a user
  subToUser() {
    let sub = {
      user_id: this.shwitt.author._id,
      subscribed: true
    }
    this.shwittService.subscribeToUser(sub).subscribe((res: any) => {
      this.shwitt.subscribed = res.subscribed;
      // this.WebSocketsService.userSubscribed({
      //   token: this.token, user_id: this.shwitt.author._id
      // });
      this.WebSocketsService.notificationCount({jwt: this.token})
    });


  }

  unsubToUser() {
    let unsub = {
      user_id: this.shwitt.author._id,
      subscribed: false
    }
    this.shwittService.subscribeToUser(unsub).subscribe((res: any) => {
      this.shwitt.subscribed = res.subscribed;
      this.WebSocketsService.notificationCount({jwt: this.token})
    });

    this.subbed = false;
  }

  getUser() {

  }

  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe(params => {
      this.singleShwittId = params['id'];
    })

    if( this.singleShwittId) {
      this.shwittService.getSingleShwitt(this.singleShwittId).subscribe((res : any) => {
        this.shwitt = res;
      })
    }

    this.token = localStorage.getItem('token');
    const helper = new JwtHelperService();
    this.decodedToken = helper.decodeToken(this.token);

    this.liked = this.shwitt.liked;
    this.likes_length = this.shwitt.likes.length;

    this.WebSocketsService.getLikes().subscribe((res: any) => {
      console.log(res);
      if(this.shwitt._id === res.shweet._id) {
        this.shwitt.likes = res.shweet.likes;
        this.likes_length = res.shweet.likes.length;
      }
    });

    this.WebSocketsService.getComments().subscribe((res: any) => {
      console.log(res.shweet);
      if(this.shwitt.comments._id === res.comments._id) {
        this.shwitt.comments = res.comments;
      }
    })



    console.log(this.ActivatedRoute.snapshot.params.id);


  }

}
