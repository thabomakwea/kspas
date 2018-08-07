import { Component, OnInit } from '@angular/core';
import { Router,  NavigationExtras, ActivatedRoute } from '@angular/router';
import { UserLogginData } from '../common/interfaces/user.interface';
import { UserService } from '../common/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {
  public user: UserLogginData;
  public loginUrl: any;
  pageTitle = 'Dashboard';
  pendingUser = true;
  public dashboardData;
  totalDependents;
  totalProducts;
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private userService: UserService
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
    this.getDashboardNumbers();
  }
  getDashboardNumbers() {
    const userObj = {
      user_id: this.user.ID
    };
    this.userService.getDashboardNumbers(userObj).subscribe(
      res => {
        this.dashboardData = JSON.parse(JSON.stringify(res));
        console.log('Bless Res: ', res);
        if (this.dashboardData) {
          this.totalDependents = res.dependents.post_count;
          if (res.user.custom_field_society_benefit[0] === 'true' && res.user.custom_field_grocery_benefit[0] === 'true') {
            // 2
            this.totalProducts = 2;
          } else if (res.user.custom_field_society_benefit[0] === 'true' && res.user.custom_field_grocery_benefit[0] === 'false') {
            // 1
            this.totalProducts = 1;
          } else if (res.user.custom_field_society_benefit[0] === 'fase' && res.user.custom_field_grocery_benefit[0] === 'true') {
            // 1
            this.totalProducts = 1;
          } else {
            // 0
            this.totalProducts = 0;
          }
        }
      },
      error => {
        console.log('Bless Error: ', error);
      }
    );
  }
}
