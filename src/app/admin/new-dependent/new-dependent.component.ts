import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders, HttpClient, HttpParams} from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Component({
  selector: 'app-new-dependent',
  templateUrl: './new-dependent.component.html',
  styleUrls: ['./new-dependent.component.css']
})
export class NewDependentComponent implements OnInit {
  rForm: FormGroup;
  formObj: any;
  constructor(private fb: FormBuilder) {
    this.rForm = fb.group({
      'firstName' : [null, Validators.required],
      'lastName' : [null, Validators.required],
      'idNumber' : [null, Validators.required],
      'dateOfBirth' : [null, Validators.required],
      'mainMemberID' : [null, Validators.required],
    });
    this.rForm.valueChanges.subscribe(
      (res) => {
        this.formObj = this.rForm.getRawValue();
      }
     );
  }

  ngOnInit() {
  }

  addDependent(form) {
    console.log('form: ', form);
  }
}
