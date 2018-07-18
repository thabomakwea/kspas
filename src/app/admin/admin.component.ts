import { Component, OnInit } from '@angular/core';
import { Router,  NavigationExtras, ActivatedRoute } from '@angular/router';
import { AdminLogginData } from '../common/interfaces/admin.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: []
})
export class AdminComponent implements OnInit {
  public user: AdminLogginData;
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
    if (localStorage.getItem('adminData') === null) {
      this.router.navigate([this.loginUrl]);
    } else {
      this.user = JSON.parse( localStorage.getItem('adminData'));
      console.log('Admin Data: ', this.user);
    }
  }
}
