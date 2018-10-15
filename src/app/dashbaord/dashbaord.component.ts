import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.css']
})
export class DashbaordComponent implements OnInit {

  constructor(private router: Router, private dataService: DataService) { }
  allProductData = [];
  userId = '';
  marked = false;
  productData = {};
  userProductArray = [];
  userTempArray = [];
    errorMsg = '';
  ngOnInit() {
    this.getAllProduct();
  }
    toggleVisibility(product, e) {
        this.errorMsg = '';
      if (e.target.checked) {
          this.productData = {user_id: localStorage.getItem('userId'), id: product.id, name: product.name, description: product.description};
          this.userProductArray.push(this.productData);
      } else {
          this.userTempArray = [];
          for (const prop of this.userProductArray) {
              if (prop.id !== product.id) {
                  this.userTempArray.push(prop);
              }
          }
          this.userProductArray = this.userTempArray.slice(0);
      }
    }
  getAllProduct() {
      this.allProductData = [];
    this.dataService.productData()
        .subscribe(
            (response) => {
                this.allProductData.push(response);
            },
            (error) => {
              console.log(error);
            }
        );
  }

  getUserProduct() {
    this.dataService.userProduct({'user_id': localStorage.getItem('userId')})
        .subscribe(
            (response) => {
                this.allProductData = [];
                this.allProductData.push(response);
            },
            (error) => {
              console.log(error);
            }
        );
  }

  addProduct() {
      this.errorMsg = '';
      if (this.userProductArray.length > 0) {
          this.dataService.addUserProduct(this.userProductArray)
              .subscribe(
                  (response) => {
                      this.getAllProduct();
                  },
                  (error) => {
                      console.log(error);
                  }
              );
      } else {
          this.errorMsg = 'Please select at lease one product';
      }
  }



}
