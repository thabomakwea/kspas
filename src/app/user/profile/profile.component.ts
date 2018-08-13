import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams} from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { UsersService } from '../../common/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UsersService]
})
export class ProfileComponent implements OnInit {
  public userData;
  public user;
  public profile = {
      firstName: null,
      lastName: null,
      address: null,
      cellphone: null,
      idNumber: null,
      occupation: null,
      telephone: null,
      societyBenefit: null,
      groceryBenefit: null,
  };

  constructor(private usersService: UsersService) { }
  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.getUser();
  }

  getUser() {
    console.log(this.userData);
    const userObj = {
      user_id: this.userData.data.ID
    };

    this.usersService.getUser(userObj).subscribe(
      res => {
        this.user = res;
        console.log('Res: ', res);
        this.initializeProfileData(res);
      },
      err => {
        console.log('Err: ', err);
      }
    );
  }
  initializeProfileData(res) {
    const profileObj = {
      firstName: res.custom_field_first_name[0],
      lastName: res.custom_field_last_name[0],
      address: res.custom_field_address[0],
      cellphone: res.custom_field_cellphone[0],
      idNumber: res.custom_field_idnumber[0],
      occupation: res.custom_field_occupation[0],
      telephone: res.custom_field_telephone[0],
      societyBenefit: res.custom_field_society_benefit[0],
      groceryBenefit: res.custom_field_grocery_benefit[0],
    };
    this.profile = profileObj;
  }
}
