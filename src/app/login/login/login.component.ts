import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { Router,  NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../common/services/login.service';
import { Nonce } from '../../common/interfaces/nonce.interface';
import { LoginObj } from '../../common/interfaces/loginObj.interface';
import { UserData } from '../../common/classes/user.class';
import { AdminData } from '../../common/classes/admin.class';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserData, AdminData]
})
export class LoginComponent implements OnInit {
  @ViewChild('username') el: ElementRef;
  statuslogin: any;
  focusin = true;
  rForm: FormGroup;
  post: any;
  usernameAlert = 'Please fill username';
  passwordAlert = 'Please fill password';
  loginAlert: string;
  loginError = false;
  returnUrl: string;
  adminUrl: string;
  userUrl: string;
  loginUrl: string;
  formObj: any;
  userLoading = false;
  serverError = false;
  errorMessages = [];
  serverSuccess = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authenticationservice: LoginService,
    public router: Router,
    private userData: UserData,
    private adminData: AdminData
  ) {
    this.rForm = fb.group({
      'username' : [null, Validators.required],
      'password' : [null, Validators.required],
    });
    this.rForm.valueChanges.subscribe(
      (res) => {
        this.formObj = this.rForm.getRawValue();
      }
     );
  }

  ngOnInit() {
    this.authenticationservice.logout();
    this.adminUrl = this.route.snapshot.queryParams['adminUrl'] || '/admin';
    this.userUrl = this.route.snapshot.queryParams['userUrl'] || '/user';
    this.loginUrl = this.route.snapshot.queryParams['loginUrl'] || '/login';
  }
  closeServerError() {
    this.serverError = false;
  }
  closeServerSuccess() {
    this.serverSuccess = false;
  }
  login(form) {
    const loginObj: LoginObj = {
      login: this.formObj
    };
   this.userLoading = true;
   this.rForm.disable();
     this.authenticationservice.login(loginObj).subscribe(
        res => {
          console.log('resLogin: ' , res);
          if  (res.roles) {
            this.serverSuccess = true;
            if (res.roles[0] === 'administrator') {
              this.authenticationservice.loginChange(res);
              localStorage.setItem('adminData', JSON.stringify(res));
              this.router.navigate([this.adminUrl]);
            } else if (res.roles[0] === 'subscriber') {
              this.authenticationservice.loginChange(res);
              localStorage.setItem('userData', JSON.stringify(res));
              this.router.navigate([this.userUrl]);
            }
          } else {

            if (res.constructor === Array) {
              console.log('Array: True');
              this.serverError = true;
              res.forEach(element => {
                this.errorMessages.push(element);
              });
            }

          }
          //
          this.rForm.enable();
          timer(3000).subscribe(() => {
            this.userLoading = false;
          });
        },
         err => {
          console.log('Error: ', err);
          this.rForm.enable();
          this.rForm.reset();
          timer(3000).subscribe(() => {
            this.userLoading = false;
          });
          this.loginError = true;
          this.loginAlert = 'Error: Please try again later';
          return err;
        }
      );
  }
}
