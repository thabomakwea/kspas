import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders, HttpClient, HttpParams} from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { NewUserService } from '../../common/services/new-user.service';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
  providers: [NewUserService]
})
export class NewUserComponent implements OnInit {
  rForm: FormGroup;
  formObj: any;
  constructor(private fb: FormBuilder, private newUserService: NewUserService) {
     this.rForm = fb.group({
      'firstName' : [null, Validators.required],
      'lastName' : [null, Validators.required],
      'occupation' : [null, Validators.required],
      'telephone' : [null, Validators.required],
      'cellphone' : [null, Validators.required],
      'password' : [null, Validators.required],
      'confirmPassword' : [null, Validators.required],
      'email' : [null, Validators.required],
      'username' : [null, Validators.required],
    });
    this.rForm.valueChanges.subscribe(
      (res) => {
        this.formObj = this.rForm.getRawValue();
      }
     );
  }

  ngOnInit() {
  }

  addUser(form) {
    console.log('Form: ', form);
    this.newUserService.newUser(this.formObj).subscribe(
      res => {
        console.log('res', res);
      },
      err => {
        console.log('res', err);
      }
    );
  }
}
