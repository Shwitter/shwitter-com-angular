import { Component, OnInit } from '@angular/core';
import {ShwittService} from '../shwittService/shwitt.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from 'src/app/user/userServices/auth.service';
import {HttpClient} from '@angular/common/http';



@Component({
  selector: 'app-shwittes',
  templateUrl: './shwittes.component.html',
  styleUrls: ['./shwittes.component.less']
})
export class ShwittesComponent implements OnInit {
  newShwitt;
  shwitts;
  shwittForm: FormGroup;
  asd: any;
  

  urls = [];
  arr = [1, 2, 3, 4, 5];

  constructor(private shwittService: ShwittService, private router: Router, private authService: AuthService,private http: HttpClient) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else {
      this.getShwitts();
    }

    this.shwittForm = new FormGroup({
      body: new FormControl('', [Validators.required]),
      shweetimage: new FormControl('', [Validators.required])
    });

    this.shwittForm.get('shweetimage').valueChanges.subscribe(res => {
      console.log(res);
    })
  }

  shwitt(event) {
    // this.shwittService.createShwitt(this.shwittForm).subscribe(res => {
    //   if(res) {
    //     this.getShwitts();
    //     console.log(this.shwitts);

    //   }
    // })

    let formData = new FormData();
    formData.append('body', this.shwittForm.value.body);
    formData.append('shweetimage', this.shwittForm.value.shweetimage);

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => {
        this.asd = event.target.result;
      }
    }

    console.log(event.target.files);

    // this.http.post(`http://api.shwitter.localhost/shweet/create`, formData).subscribe(res => {
    //     this.getShwitts();
    // });


  }

  getShwitts() {
    this.shwittService.getShwitts().subscribe((res : any) => {
      this.shwitts = res;
    })
  }

  uploadImg(event) {

  }
}
