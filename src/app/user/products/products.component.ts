import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams} from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { UsersService } from '../../common/services/users.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [UsersService]
})
export class UserProductsComponent implements OnInit {
  public userData;
  public user;
  public societyBenefit;
  public groceryBenefit;

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
        this.societyBenefit =  res.custom_field_grocery_benefit[0];
        this.groceryBenefit = res.custom_field_society_benefit[0];
        console.log('Res: ', res);
        console.log('this.societyBenefit: ', this.societyBenefit);
        console.log('this.groceryBenefit: ', this.groceryBenefit);
      },
      err => {
        console.log('Err: ', err);
      }
    );
  }

}
