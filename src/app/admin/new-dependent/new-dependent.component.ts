import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders, HttpClient, HttpParams} from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { DependentsService } from '../../common/services/dependents.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Component({
  selector: 'app-new-dependent',
  templateUrl: './new-dependent.component.html',
  styleUrls: ['./new-dependent.component.css'],
  providers: [DependentsService]
})
export class NewDependentComponent implements OnInit {
  public dependents;
  rForm: FormGroup;
  formObj: any;
  dependentAdded: boolean;
  public disableSubmitBtn = true;

  constructor(private fb: FormBuilder, private dependentsService: DependentsService) {
    this.rForm = fb.group({
      'firstName' : [null, Validators.required],
      'lastName' : [null, Validators.required],
      'idNumber' : [null, Validators.required],
      'dateOfBirth' : [null, Validators.required],
      'mainMemberID' : [null, Validators.required],
      'dependentType' : [null, Validators.required],
    });
    this.rForm.valueChanges.subscribe(
      (res) => {
        this.formObj = this.rForm.getRawValue();
      }
     );
  }

  ngOnInit() {
  }
  isValidForm() {
    return this.rForm.valid;
  }
  addDependent(form) {
    console.log('form: ', form);
    this.dependentsService.addDependent(form).subscribe(
      res => {
        console.log('Res: ', res);
        this.rForm.enable();
        this.rForm.reset();
        this.disableSubmitBtn = false;
        this.dependentAdded = true;
        timer(3000).subscribe(() => {
          this.dependentAdded = false;
        });
      },
      err => {
        console.log('Err: ', err);
      }
      );
  }
  saveDependent() {
    this.disableSubmitBtn = true;
    this.rForm.disable();
    this.addDependent(this.rForm.value);
  }
  onSearchChange(searchValue: string ) {
    console.log('searchValue', searchValue);
    const searchObj = {
      key: searchValue,
      post_type: 'users'
    };
    this.dependentsService.searchDependents(searchObj).subscribe(
      res => {
        this.dependents = res;
        console.log('Res: ', res);
      },
      err => {
        console.log('Err: ', err);
      }
      );
  }
}
