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
      },
      err => {
        console.log('Err: ', err);
      }
    );
  }
}
