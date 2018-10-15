import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {Router} from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  myForm: FormGroup;
  errorMsg = '';
  // submitted = false;
  constructor(private dataService: DataService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{5,}$')]],
      conformpassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  saveData() {
    console.log(this.myForm.value);
      this.errorMsg = '';
      if (this.myForm.value && this.myForm.value.firstname && this.myForm.value.lastname && this.myForm.value.email && this.myForm.value.password && this.myForm.value.conformpassword) {
        if (this.myForm.value.password === this.myForm.value.conformpassword) {
          this.dataService.userSaveData(this.myForm.value)
              .subscribe(
                  (response) => {
                    if (response['error']) {
                      this.errorMsg = response['error'];
                    } else {
                      this.router.navigate(['login']);
                    }
                  },
                  (error) => {
                    console.log(error);
                  }
              );
        } else {
          this.errorMsg = 'Password and conform password should be same';
        }
      } else {
        this.errorMsg = 'Please fill all required fields';
      }
    }
  }

