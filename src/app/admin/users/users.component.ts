import { Component, OnInit, TemplateRef } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders, HttpClient, HttpParams} from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { UsersService } from '../../common/services/users.service';
import { UserLogginData } from '../../common/interfaces/user.interface';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UsersService, BsModalService]
})
export class UsersComponent implements OnInit {
  private url = 'http://kspas.co.za/wp-json/custom-plugin/v1/get_users';
  public adminData: any;
  public users: any;
  public user: any;
  public userData: any;
  public userUpdated = false;
  modalRef: BsModalRef;
  rForm: FormGroup;
  formObj: any;
  disableSubmitBtn: boolean;
  dependentAdded: boolean;
  public queryString: any;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient, private usersService: UsersService, private modalService: BsModalService) {
      this.rForm = fb.group({
        'first_name' : [null, Validators.required],
        'last_name' : [null, Validators.required],
        'occupation' : [null, Validators.required],
        'telephone' : [null, Validators.required],
        'cellphone' : [null, Validators.required],
        'address' : [null, Validators.required],
        'id_number' : [null, Validators.required],
        'email' : [null, Validators.required],
        'username' : [null, Validators.required],
        'society_benefit': [null, Validators.required],
        'grocery_benefit': [null, Validators.required],
        'user_id': [],
      });
      this.rForm.valueChanges.subscribe(
        (res) => {
          this.formObj = this.rForm.getRawValue();
        }
      );
      this.usersService.getUsers();
    }

  ngOnInit() {
    this.adminData = JSON.parse(localStorage.getItem('adminData'));
    this.getUsers();
    console.log('this.adminData: ', this.adminData);
  }
  initializeUserData(user) {
    const userData = {
      fullName: user.display_name,
      email: user.user_email,
      regDate: user.user_registered,
      userID: user.ID,
      username: user.user_login
    };
    this.userData = userData;
  }
  getUsers() {

    this.usersService.listUsersStream$.subscribe(
      res => {
        this.users = JSON.parse(JSON.stringify(res)).map( user => {
          return user.data;
        });
        console.log('UsersRes: ',  this.users);
      },
      err => {
        console.log('UsersErr: ', err);
      }
    );
  }
  openModal(template: TemplateRef<any>, user, action?: string) {
    this.getUser(user, action);
    this. initializeUserData(user);
    this.modalRef = this.modalService.show(template);
  }
  prepopulateUsersData(user) {
    console.log('prepopulateUsersData: ', user);
    console.log('prepopulateUsersData: ', this.user);
    this.rForm.get('username').setValue(user.user_login);
    this.rForm.get('email').setValue(user.user_email);
    this.rForm.get('user_id').setValue(user.ID);

    (this.user.custom_field_first_name) ?
    this.rForm.get('first_name').setValue(this.user.custom_field_first_name[0]) :
    this.rForm.get('first_name').setValue('');

    (this.user.custom_field_last_name) ?
    this.rForm.get('last_name').setValue(this.user.custom_field_last_name[0]) :
    this.rForm.get('last_name').setValue('');

    (this.user.custom_field_occupation) ?
    this.rForm.get('occupation').setValue(this.user.custom_field_occupation[0]) :
    this.rForm.get('occupation').setValue('');

    (this.user.custom_field_telephone) ?
    this.rForm.get('telephone').setValue(this.user.custom_field_telephone[0]) :
    this.rForm.get('telephone').setValue('');

    (this.user.custom_field_cellphone) ?
    this.rForm.get('cellphone').setValue(this.user.custom_field_cellphone[0]) :
    this.rForm.get('cellphone').setValue('');

    (this.user.custom_field_address) ?
    this.rForm.get('address').setValue(this.user.custom_field_address[0]) :
    this.rForm.get('address').setValue('');

    (this.user.custom_field_idnumber) ?
    this.rForm.get('id_number').setValue(this.user.custom_field_idnumber[0]) :
    this.rForm.get('id_number').setValue('');

    (this.user.custom_field_society_benefit) ?
    this.rForm.get('society_benefit').setValue(this.user.custom_field_society_benefit[0]) :
    this.rForm.get('society_benefit').setValue('');

    (this.user.custom_field_grocery_benefit) ?
    this.rForm.get('grocery_benefit').setValue(this.user.custom_field_grocery_benefit[0]) :
    this.rForm.get('grocery_benefit').setValue('');
  }
  getUser(user, action?: any) {
    console.log('user: ', user);
    console.log('user_id: ', user.ID);
    const userObj = { 'user_id': user.ID };
    this.usersService.getUser(userObj).subscribe(
      res => {
        this.user = res;
        console.log('UserRes: ', res);
      },
      err => {
        console.log('UserErr: ', err);
      },
      () => {
        if (action) { if ( action === 'edit') { this.prepopulateUsersData(user); } }
      }
    );
  }
  updateUser(form) {
    console.log('form:', form);
    this.usersService.updateUser(form).subscribe(
      res => {
        console.log('updateUserRes: ',  this.users);
        this.rForm.enable();
        this.rForm.reset();
        this.disableSubmitBtn = false;
        this.userUpdated = true;
        this.modalRef.hide();

        timer(3000).subscribe(() => {
          this.userUpdated = false;
        });

      },
      err => {
        console.log('updateUserErr: ', err);
      }
    );
    this.getUsers();
  }
  isValidForm() {
    return this.rForm.valid;
  }
}
