import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin = '';
  firstname = '';
  constructor(private router: Router) { }
  ngOnInit() {
    this.isLogin = localStorage.getItem('LoggedInUser');
    this.firstname = localStorage.getItem('firstname');

    const test = localStorage.getItem('token');
  }
  userLogout() {
    localStorage.removeItem('LoggedInUser');
    this.router.navigate(['login']);
  }

}
