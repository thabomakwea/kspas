import { Component, OnInit, TemplateRef } from '@angular/core';
import { Observable, timer, of } from 'rxjs';
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
  private url = 'http://kspas.co.za/wp-json/custom-plugin/v1/getUsers';
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
  listSubscription: any;
  userSubscription: any;
  public configTable = {
    totalPages: [],
    currentPage: 1,
    totalRecords: 0
  };
  usersList: any;
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
     // this.usersService.getUsers();
    }

  ngOnInit() {
    this.adminData = JSON.parse(localStorage.getItem('adminData'));
    console.log('this.adminData: ', this.adminData);
    this.getUsers();
  }
  initializeUserData(user, currUser) {
    const userData = {
      firstName: (user.custom_field_first_name) ? user.custom_field_first_name[0] : null,
      lastName: (user.custom_field_last_name) ? user.custom_field_last_name[0] : null,
      address: (user.custom_field_address) ? user.custom_field_address[0] : null,
      cellphone: (user.custom_field_cellphone) ? user.custom_field_cellphone[0] : null,
      groceryBenefit: (user.custom_field_grocery_benefit) ? user.custom_field_grocery_benefit[0] : null,
      occupation: (user.custom_field_occupation) ? user.custom_field_occupation[0] : null,
      societyBenefit: (user.custom_field_society_benefit) ? user.custom_field_society_benefit[0] : null,
      telephone: (user.custom_field_telephone) ? user.custom_field_telephone[0] : null,
      username: (currUser.user_login) ? currUser.user_login : null,
      regDate: (currUser.user_registered) ? currUser.user_registered : null,
      email: (currUser.user_email) ? currUser.user_email : null
    };
    this.userData = userData;
  }
  getUsers() {
    this.userSubscription =   this.usersService.getUsers().subscribe(
      res => {
        console.log('Res: ', res);
        this.usersList = res;
        this.users = res.map(
          user => {
            return user.userMeta;
          }
        );
        console.log('UsersRes: ', this.users);
      },
      err => {
        console.log('UsersErr: ', err);
      }
    );
  }
  openModal(template: TemplateRef<any>, user, action?: string) {
    this.getUser(user, template, action);
  }
  prepopulateUsersData(user, userData?: any) {
    console.log('prepopulateUsersData: ', user);
    console.log('prepopulateUsersData: ', this.user);
    this.rForm.get('username').setValue(userData.user_login);
    this.rForm.get('email').setValue(userData.user_email);
    this.rForm.get('user_id').setValue(userData.ID);

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
  getUser(user, template, action?: any) {
    console.log('user: ', user);
    console.log('user_id: ', this.usersList[user].user.data.ID);
    const userObj = { 'user_id': this.usersList[user].user.data.ID };
    this.usersService.getUser(userObj).subscribe(
      res => {
        this.user = res;
        console.log('UserRes2: ', res);
      },
      err => {
        console.log('UserErr2: ', err);
      },
      () => {
        if (action) {
          if ( action === 'edit') {
            this.prepopulateUsersData(user, this.usersList[user].user.data);
          }
        }
        this.initializeUserData(this.user, user);
        this.modalRef = this.modalService.show(template);
      }
    );
  }
  updateUser(form) {
    console.log('form:', form);
    this.usersService.updateUser(form).subscribe(
      res => {
        console.log('updateUserRes: ',  res);
        this.rForm.enable();
        this.rForm.reset();
        this.disableSubmitBtn = false;
        this.userUpdated = true;
        this.modalRef.hide();
        window.scroll(0, 0);
        timer(3000).subscribe(() => {
          this.userUpdated = false;
        });
        this.userSubscription.unsubscribe();
        this.getUsers();
      },
      err => {
        console.log('updateUserErr: ', err);
      }
    );

  }
  isValidForm() {
    return this.rForm.valid;
  }
  onSearchChange(searchValue: string, pageNumber?: any ) {
    console.log(searchValue);
    const searchObj = {
      key: searchValue,
      pageNumber: pageNumber
    };

    this.userSubscription =   this.usersService.getUsers(searchObj).subscribe(
      res => {
        console.log('Res: ', res);
        this.usersList = res;
        this.users = res.map(
          user => {
            return user.userMeta;
          }
        );
        console.log('UsersRes: ', this.users);
      },
      err => {
        console.log('UsersErr: ', err);
      }
    );
  }
}
