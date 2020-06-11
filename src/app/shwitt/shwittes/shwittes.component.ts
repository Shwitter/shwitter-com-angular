import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
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
  newShwitt = {
    text: '',
    image: null
  }
  subscribes;
  shwitts;
  currentUser;
  // shwittForm: FormGroup;
  urls = [];

  constructor(private shwittService: ShwittService,
              private router: Router,
              private authService: AuthService,
              private http: HttpClient,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else {
      this.getShwitts();
    }

    // this.shwittForm = new FormGroup({
    //   body: new FormControl('', [Validators.required]),
    //   shweetimage: new FormControl('', [Validators.required])
    // });
    this.getMe()
  }

  getMe() {
    this.shwittService.getMe().subscribe((res: any) => {
      this.subscribes = res.subscribes;
      this.currentUser = res;
    });
  }

  shwitt() {
    // const formData = new FormData();
    // formData.append('body', this.shwittForm.value.body);
    // formData.append('shweetimage', this.shwittForm.value.shweetimage);

    let newShwittBody = {
      body: this.newShwitt.text,
      shweetimage: this.newShwitt.image // TODO::
    }

    this.http.post(`http://api.shwitter.localhost/shweet/create`, newShwittBody).subscribe(res => {
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
        // this.shwittForm.patchValue({
        //   shweetimage: reader.result
        // });
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
      this.shwitts = res;
    });
  }
}
