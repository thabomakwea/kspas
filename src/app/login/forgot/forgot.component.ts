import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router,  NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../common/services/login.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  rForm: FormGroup;
  formObj: any;
  serverError = false;
  errorMessages = [];
  serverSuccess = false;
  spinnerLoading = false;

  constructor(private fb: FormBuilder, private authenticationservice: LoginService) {
    this.rForm = fb.group({
      'userLogin' : [null, Validators.required]
    });
    this.rForm.valueChanges.subscribe(
      (res) => {
        this.formObj = this.rForm.getRawValue();
      }
     );
   }

  ngOnInit() {
  }
  forgot(form) {
    this.rForm.disable();
    this.spinnerLoading = true;
    console.log('form: ', form);
    this.authenticationservice.forgotPassword(form).subscribe(
      res => {
        console.log('forgotPassword: ' , res);
        this.rForm.enable();
        this.rForm.reset();
        this.spinnerLoading = false;
        if (res === 'SUCCESS') {
          this.serverSuccess = true;
        } else {
          this.serverError = true;
        }
      },
       err => {
        this.serverError = true;
        console.log('Error: ', err );
        return err;
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
