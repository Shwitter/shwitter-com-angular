import { Component, OnInit } from '@angular/core';
import {ShwittService} from '../../shwittService/shwitt.service';

@Component({
  selector: 'app-shwitt',
  templateUrl: './shwitt.component.html',
  styleUrls: ['./shwitt.component.sass']
})
export class ShwittComponent implements OnInit {
  shwitt = {};

  othersShwitt = {
    liked: null
  };
  constructor(private shwittService: ShwittService) { }

  likeShwitt() {
    this.othersShwitt.liked += 1;
  }

  getShwitts() {
    this.shwittService.getShwitts().subscribe(res => {
      this.shwitt = res;

    })
  }

  comment() {

  }

  dislikeShwitt() {
    this.othersShwitt.liked -= 1;
    if(this.othersShwitt.liked < 0) {
      this.othersShwitt.liked = 0;
    }
  }

  ngOnInit(): void {
    this.getShwitts();
  }

}
