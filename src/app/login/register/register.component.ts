import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { Router,  NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../common/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    rForm: FormGroup;
    formObj: any;
    serverError = false;
    errorMessages = [];
    serverSuccess = false;
    spinnerLoading = false;

  constructor(private fb: FormBuilder, private authenticationservice: LoginService) {
    this.rForm = fb.group({
      'username' : [null, Validators.required],
      'email' : [null, Validators.required],
      'cellphone' : [null, Validators.required],
      'telephone' : [null, Validators.required],
      'idNumber' : [null, Validators.required],
      'address' : [null, Validators.required],
      'occupation' : [null, Validators.required],
      'firstName' : [null, Validators.required],
      'lastName' : [null, Validators.required],
    });
    this.rForm.valueChanges.subscribe(
      (res) => {
        this.formObj = this.rForm.getRawValue();
      }
     );
   }

  ngOnInit() {
  }
  register(form) {
    this.serverSuccess = false;
    this.serverError = false;
    this.spinnerLoading = true;
    this.rForm.disable();
    console.log('form: ', form);
    this.authenticationservice.registerUser(form).subscribe(
      res => {
        console.log('resLogin: ' , res);
        this.rForm.enable();
          this.rForm.reset();
          this.spinnerLoading = false;
        if (res.constructor === Array) {
          console.log('Array: True');
          this.serverError = true;
          res.forEach(element => {
            this.errorMessages.push(element);
          });
        } else {
          this.serverSuccess = true;
        }

      },
       err => {
        this.spinnerLoading = false;
        this.serverSuccess = true;
        this.rForm.enable();
        this.rForm.reset();
        return err;
      },
      () => {
        this.spinnerLoading = false;
      }
    );
  }
  closeServerError() {
    this.serverError = false;
  }
  closeServerSuccess() {
    this.serverSuccess = false;
  }
}
