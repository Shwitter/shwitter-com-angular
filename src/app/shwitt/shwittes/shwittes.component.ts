import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ShwittService} from '../shwittService/shwitt.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from 'src/app/user/userServices/auth.service';
import {HttpClient} from '@angular/common/http';
import { WebSocketsService } from '../../shared/services/webSockets.service'


@Component({
  selector: 'app-shwittes',
  templateUrl: './shwittes.component.html',
  styleUrls: ['./shwittes.component.less']
})
export class ShwittesComponent implements OnInit {
  newShwitt = {
    text: '',
    image: null
  }
  subscribes;
  shwitts;
  currentUser;

  constructor(private shwittService: ShwittService,
              private router: Router,
              private authService: AuthService,
              private http: HttpClient,
              private cd: ChangeDetectorRef,
              private WebSocketService: WebSocketsService) {
  }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else {
      this.getShwitts();
    }
    this.getMe();

    this.WebSocketService.getNewShwitt().subscribe((res: any) => {
      console.log(1);
      this.shwitts.push(res.shweet);
    });

  }

  getMe() {
    this.shwittService.getMe().subscribe((res: any) => {
      this.subscribes = res.subscribes;
      this.currentUser = res;
    });
  }

  shwitt() {
    let newShwittBody = {
      body: this.newShwitt.text,
      shweetimage: this.newShwitt.image // TODO::
    }

    this.http.post(`https://2975be7c61a1.ngrok.io/shweet/create`, newShwittBody).subscribe(res => { //api.shwitter-cst.tk/shweet/create
      if(res) {
        this.getShwitts();
      }
    });
  }


  ImageChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      console.log(reader.result);
      reader.onload = () => {
        this.newShwitt.image = reader.result;
        console.log(this.newShwitt.image);

        this.cd.markForCheck();
      };
    }
  }

  getSubShwitts() {
    this.shwittService.getSubShwitts().subscribe((res: any) => {
      this.shwitts = res;
    });
  }

  getShwitts() {
    this.shwittService.getShwitts().subscribe((res: any) => {
      console.log(res);
      this.shwitts = res;
    });
  }
}
