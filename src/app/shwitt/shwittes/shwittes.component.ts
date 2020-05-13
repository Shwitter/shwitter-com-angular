import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../user/userServices/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shwittes',
  templateUrl: './shwittes.component.html',
  styleUrls: ['./shwittes.component.sass']
})
export class ShwittesComponent implements OnInit {
  arr = [1, 2, 3, 4, 5];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }
}
