import { Component, OnInit, TemplateRef } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders, HttpClient, HttpParams} from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DependentsService } from '../../common/services/dependents.service';
import { FilterdataPipe  } from '../../common/pipes/filterdata.pipe';

@Component({
  selector: 'app-dependents',
  templateUrl: './dependents.component.html',
  styleUrls: ['./dependents.component.css'],
  providers: [DependentsService, BsModalService]
})

export class DependentsComponent implements OnInit {
  public dependents;
  public dependentData: any;
  public userUpdated = false;
  public userDeleted = false;
  public dependentID;
  modalRef: BsModalRef;
  rForm: FormGroup;
  formObj: any;
  public queryString: any;
  constructor(private fb: FormBuilder, private dependentsService: DependentsService, private modalService: BsModalService) {
    this.rForm = fb.group({
      'firstName' : [null, Validators.required],
      'lastName' : [null, Validators.required],
      'idNumber' : [null, Validators.required],
      'dob' : [null, Validators.required],
      'mainMemberID' : [null, Validators.required],
      'dependentType' : [null, Validators.required],
      'regDate' : [null, Validators.required],
      'post_id' : [null, Validators.required],
    });
    this.rForm.valueChanges.subscribe(
      (res) => {
        this.formObj = this.rForm.getRawValue();
      }
     );
   }

  ngOnInit() {
    this.getDependents();
  }
  isValidForm() {
    return this.rForm.valid;
  }
  getDependents() {
    this.dependentsService.getDependents().subscribe(
      res => {
        this.dependents = res.posts;
        console.log('Res: ', res.posts);
      },
      err => {
        console.log('Err: ', err);
      }
      );
    }
    openModal(template: TemplateRef<any>, dependent, action?: string) {
      console.log('dependent: ', dependent);
      this. initializeDependentData(dependent);
      if (action) { if ( action === 'edit') { this.prepopulateUsersData(this.dependentData); } }
      if (action) { if ( action === 'delete') { this.dependentID = dependent.id; } }
      this.modalRef = this.modalService.show(template);
    }
    initializeDependentData(dependent) {
      console.log('dependent: ', dependent);
      const dependentObj = {
        'firstName' : dependent.custom_fields.ct_name_text_e394[0],
        'lastName' : dependent.custom_fields.ct_Last_name_text_3960[0],
        'idNumber' : dependent.custom_fields.ct_ID_text_e7e5[0],
        'dependentType' : dependent.custom_fields.ct_Dependent__text_c916[0],
        'dob' : dependent.custom_fields.ct_Date_of_bi_text_e345[0],
        'mainMemberID' : dependent.custom_fields.ct_Main_membe_text_a55f[0],
        'regDate' : dependent.date,
        'post_id' : dependent.id
      };
      this.dependentData = dependentObj;
    }
    prepopulateUsersData(dependentData) {
      console.log('dependentData: ', dependentData);
      console.log('dependentDataKeys: ', Object.keys(dependentData).length);
      this.rForm.patchValue(dependentData);
    }
    onSearchChange(searchValue: string ) {
      console.log(searchValue);
      // const searchObj = {
      //   key: searchValue,
      //   post_type: 'dependents',
      // };

      // this.dependentsService.searchDependents(searchObj).subscribe(
      // res => {
      //   // this.dependents = res.posts;
      //   console.log('Res: ', res);
      // },
      // err => {
      //   console.log('Err: ', err);
      // }
      // );
    }
    updateDependent(form) {
     //  console.log('form: ', form);
      this.dependentsService.updateDependent(form).subscribe(
      res => {
        console.log('Res: ', res);
        this.modalRef.hide();
        this.userUpdated = true;
        this.getDependents();
        timer(3000).subscribe(() => {
        // set showloader to false to hide loading div from view after 5 seconds
          this.userUpdated = false;
        });
      },
      err => {
        console.log('Err: ', err);
      }
      );
    }
    deleteDependent() {
      const deleteDependentObj = {
        'post_id': this.dependentID
      };

      this.dependentsService.deleteDependent(deleteDependentObj).subscribe(
      res => {
        // this.dependents = res.posts;
        console.log('Res: ', res);
        this.modalRef.hide();
        this.userDeleted = true;
        timer(3000).subscribe(() => {
        // set showloader to false to hide loading div from view after 5 seconds
          this.userDeleted = false;
          this.getDependents();
        });
      },
      err => {
        console.log('Err: ', err);
      }
      );
    }
}
