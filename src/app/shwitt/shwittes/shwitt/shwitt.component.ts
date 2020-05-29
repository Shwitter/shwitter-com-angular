import { Component, OnInit } from '@angular/core';
import {ShwittService} from '../../shwittService/shwitt.service';

@Component({
  selector: 'app-shwitt',
  templateUrl: './shwitt.component.html',
  styleUrls: ['./shwitt.component.less']
})
export class ShwittComponent implements OnInit {
  shwitt = {
    liked: [
      '123',
      '1232131231',
    ],
    comments: {
      _id: '5ebd9b5529d484004cc50439',
      comments: [
        {
          _id: '5ebd9be729d484004cc5043b',
          body: 'asdsadasd1',
          author: 'tes test1',
          created: '2020-05-14T19:28:39.507z',
          updated: "2020-05-14T19:28:39.507Z"
        }, {
          _id: '5ebd9be729d484004cc5043b',
          body: 'asdsadasd2',
          author: 'tes test2',
          created: '2020-05-14T19:28:39.507z',
          updated: "2020-05-14T19:28:39.507Z"
        }, {
          _id: '5ebd9be729d484004cc5043b',
          body: 'asdsadasd3',
          author: 'test test3',
          created: '2020-05-14T19:28:39.507z',
          updated: "2020-05-14T19:28:39.507Z"
        },
      ]
    },
    action: 'liked',
  };

  commentOpen = false

  constructor(private shwittService: ShwittService) { }

  handleLikeShwitt() {
    this.shwittService.likeShwitt();
  }

  openComments() {
    this.commentOpen = !this.commentOpen
  }

  getShwitts() {
    this.shwittService.getShwitts().subscribe((res : any) => {
      this.shwitt = res;
      console.log(res);
    })
  }

  comment() {

  }

  ngOnInit(): void {
    this.getShwitts();
  }

}
