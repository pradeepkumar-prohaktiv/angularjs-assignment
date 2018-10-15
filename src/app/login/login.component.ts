import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  errorMsg = '';
  loggedData;
  login = {
    email: '',
    password:''
  }
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
  }


  userLogin() {
      this.dataService.login(this.login)
      .subscribe(

        (response) => {
           if (response) {
              this.errorMsg = '';
              localStorage.setItem('LoggedInUser', response['token']);
              localStorage.setItem('userId', response['_id']);
              localStorage.setItem('firstname', response['firstname']);
              this.router.navigate(['dashboard']);
           } else {
              this.errorMsg = 'Invalid username or password';
           }
        },
        (error) => {
          console.log(error);
        }
      );
  }

}
