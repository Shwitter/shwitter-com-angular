import { Component, OnInit } from '@angular/core';
import {ShwittService} from '../shwittService/shwitt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shwittes',
  templateUrl: './shwittes.component.html',
  styleUrls: ['./shwittes.component.sass']
})
export class ShwittesComponent implements OnInit {
  user = {
    shwitt: null,
    img: null,
  };
  urls = [];
  arr = [1, 2, 3, 4, 5];

  constructor(private shwittService: ShwittService, private router: Router) { }

  ngOnInit(): void {
    // if (!this.authService.isAuthenticated()) {
    //   this.router.navigate(['/login']);
    // }
  }

  shwitt(event) {
    this.shwittService.createShwitt(this.user).subscribe(res => {
      console.log(res);
    })
  }

  uploadImg(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => {
        this.urls.push(event.target.result);
      }
    }
  }
}
