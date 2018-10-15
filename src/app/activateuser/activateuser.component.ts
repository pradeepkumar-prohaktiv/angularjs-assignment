import { Component, OnInit, Input } from '@angular/core';
import {RouterModule, Routes, ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../data.service';


@Component({
  selector: 'app-activateuser',
  templateUrl: './activateuser.component.html',
  styleUrls: ['./activateuser.component.css']
})
export class ActivateuserComponent implements OnInit {
  constructor(private route: ActivatedRoute, private location: Location, private dataService: DataService) { }
userToken = {};
  ngOnInit() {
    this.activateUser();

  }
  activateUser() {
    const token = this.route.snapshot.paramMap.get('token');
    console.log(token);
    this.userToken = {token: token};
    this.dataService.activateUser(this.userToken)
        .subscribe(
            (response) => {
              localStorage.removeItem('LoggedInUser');
            },
            (error) => {
              console.log(error);
            }
        );
  }

}
