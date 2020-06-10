import { Component, OnInit, Input } from '@angular/core';
import {ShwittService} from '../../shwittService/shwitt.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-shwitt',
  templateUrl: './shwitt.component.html',
  styleUrls: ['./shwitt.component.less']
})
export class ShwittComponent implements OnInit {
  @Input() shwitt: any;
  @Input() subscribes: any;


  action = null;
  userComment = null;
  commentOpen = false;
  canUpdate = false;
  subbed = false;
  unsub = false;
  decodedToken;

  constructor(private shwittService: ShwittService) { }

  handleLikeShwitt() {
    this.shwittService.likeShwitt({shweet_id: this.shwitt._id});
  }

  openComments() {
    this.commentOpen = !this.commentOpen;
    console.log(this.shwitt.comments)
  }

  comment() {
    this.shwittService.commentOnShwitt({comment_id: this.shwitt.comments? this.shwitt.comments._id : null, body: this.userComment}).subscribe((res: any)=> {
      this.shwitt.comments = res;
      this.userComment = null;
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
    let user_id = {
      user_id: this.shwitt.author._id
    }
    this.shwittService.subscribeToUser(user_id).subscribe((res: any) => {
      if(res.action === "subscribed") {
        this.unsub = true;
        this.subbed = true;
      }
    });
  }

  unsubToUser() {
    let user_id = {
      user_id: this.shwitt.author._id
    }
    this.shwittService.subscribeToUser(user_id).subscribe((res: any) => {
      console.log("unsubbed", res);
    });

    this.subbed = false;
  }

  getUser() {

  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const helper = new JwtHelperService();

    this.decodedToken = helper.decodeToken(token);
    if(this.subscribes) {
      this.subscribes.forEach(sub => {
        if(sub._id === this.shwitt.author._id) {
          this.subbed = true;
          this.unsub = true;
        } else {
          this.subbed = false;
          this.unsub = false;
        }
      })
    }

  }

}
