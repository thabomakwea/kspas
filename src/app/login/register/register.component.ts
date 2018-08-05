import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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
  constructor(private fb: FormBuilder, private authenticationservice: LoginService) {
    this.rForm = fb.group({
      'username' : [null, Validators.required],
      'email' : [null, Validators.required],
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
    console.log('form: ', form);
    this.authenticationservice.registerUser(form).subscribe(
      res => {
        console.log('resLogin: ' , res);
      },
       err => {
        return err;
      }
    );
  }
}
