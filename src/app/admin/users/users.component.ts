import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams} from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { UsersService } from '../../common/services/users.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UsersService]
})
export class UsersComponent implements OnInit {
  private url = 'http://kspas.co.za/wp-json/custom-plugin/v1/get_users';
  public adminData: any;
  public users: any;

  constructor(private http: HttpClient, private usersService: UsersService) { }

  ngOnInit() {
    this.adminData = JSON.parse(localStorage.getItem('adminData'));
    this.getUsers();
    console.log('this.adminData: ', this.adminData);
  }

  getUsers() {
    this.usersService.getUsers().subscribe(
      res => {
        this.users = res;
        console.log('Res: ', res);
      },
      err => {
        console.log('Err: ', err);
      }
    );
  }
}
