import { Component, OnInit, Input } from '@angular/core';
import {ShwittService} from '../../shwittService/shwitt.service';

@Component({
  selector: 'app-shwitt',
  templateUrl: './shwitt.component.html',
  styleUrls: ['./shwitt.component.less']
})
export class ShwittComponent implements OnInit {

  @Input() shwitt: any;
  // shwitts = {
  //   _id: '123445555213sdsada',
  //   liked: [
  //     '123',
  //     '1232131231',
  //   ],
  //   comments: {
  //     _id: '5ebd9b5529d484004cc50439',
  //     comment: [
  //       {
  //         _id: '5ebd9be729d484004cc5043b',
  //         body: 'asdsadasd1',
  //         author: 'tes test1',
  //         created: '2020-05-14T19:28:39.507z',
  //         updated: "2020-05-14T19:28:39.507Z"
  //       }, {
  //         _id: '5ebd9be729d484004cc5043b',
  //         body: 'asdsadasd2',
  //         author: 'tes test2',
  //         created: '2020-05-14T19:28:39.507z',
  //         updated: "2020-05-14T19:28:39.507Z"
  //       }, {
  //         _id: '5ebd9be729d484004cc5043b',
  //         body: 'asdsadasd3',
  //         author: 'test test3',
  //         created: '2020-05-14T19:28:39.507z',
  //         updated: "2020-05-14T19:28:39.507Z"
  //       },
  //     ]
  //   },
  // };

  action = null;
  userComment = null;
  commentOpen = false;
  canUpdate = false;

  constructor(private shwittService: ShwittService) { }

  handleLikeShwitt() {
    this.shwittService.likeShwitt({shweet_id: this.shwitt._id});
  }

  openComments() {
    this.commentOpen = !this.commentOpen;
    console.log(this.shwitt.comments)
  }

  comment() {
    this.shwittService.commentOnShwitt({comment_id: this.shwitt.comments._id, body: this.userComment}).subscribe((res: any)=> {
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
    this.shwittService.removeComment({comment_id: comment._id}).subscribe(res => {

    })
  }

  // sub/unsub to a user
  subToUser() {
    this.shwittService.subToUser
  }

  ngOnInit(): void {
    console.log(this.shwitt);
  }

}
