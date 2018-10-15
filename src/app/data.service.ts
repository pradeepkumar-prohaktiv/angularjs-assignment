import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn : 'root'
})

export class DataService {

    constructor(private http: HttpClient){}

    userSaveData(data) {
        return this.http.post('http://localhost:3000/users/registration', data);
    }

    login(data) {
        return this.http.post('http://localhost:3000/users/login', data);
    }

    productData() {
        return this.http.get('http://localhost:3000/products/');
    }

    userProduct(userId) {
        return this.http.post('http://localhost:3000/products/user_product', userId);
    }
    addUserProduct(data) {
        return this.http.post('http://localhost:3000/products/add_product', data);
    }
    activateUser(data) {
        return this.http.post('http://localhost:3000/users/activate_user', data);
    }
}