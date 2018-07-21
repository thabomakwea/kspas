import { Component, OnInit } from '@angular/core';
import { Router,  NavigationExtras, ActivatedRoute } from '@angular/router';
import { UserLogginData } from '../common/interfaces/user.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public user: UserLogginData;
  public loginUrl: any;
  pageTitle = 'Dashboard';

  constructor(
    private route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.loginUrl = this.route.snapshot.queryParams['loginUrl'] || '/login';
    // console.log('Admin Data: ', this.user);
    //  console.log('Admin ID: ',  this.user.ID);
    if (localStorage.getItem('userData') === null) {
      this.router.navigate([this.loginUrl]);
    } else {
      this.user = JSON.parse( localStorage.getItem('userData'));
      console.log('User Data: ', this.user);
    }
  }

}
