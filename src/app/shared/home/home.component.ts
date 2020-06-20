import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {ShwittService} from '../../shwitt/shwittService/shwitt.service';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  user : any;
  constructor(private homeService: ShwittService, private cd: ChangeDetectorRef, private http: HttpClient) { }

  ngOnInit(): void {
    this.homeService.getMe().subscribe((res : any) => {
      this.user = res;
    });
  }

  uploadImage(event) {
    let haveImage = false;
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      console.log(reader.result);
      reader.onload = () => {
        this.user.avatar = reader.result;
        console.log(this.user.avatar);
        haveImage = true
        this.cd.markForCheck();
        this.http.post(`https://ea93b4cfbbef.ngrok.io/user/update`, {
          avatar: this.user.avatar
        }).subscribe((res : any) => {
          this.user = res;
        })
      };
    }

    // if(haveImage) {

    // }
  }

}
