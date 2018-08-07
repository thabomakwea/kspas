import { Component, OnInit } from '@angular/core';
import { Router,  NavigationExtras, ActivatedRoute } from '@angular/router';
import { AdminLogginData } from '../common/interfaces/admin.interface';
import { AdminService } from '../common/services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [AdminService]
})
export class AdminComponent implements OnInit {
  public user: AdminLogginData;
  public loginUrl: any;
  pageTitle = 'Dashboard';
  public countDashboard: any;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private adminService: AdminService
  ) { this.getDashbordNumbers(); }

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
  getDashbordNumbers() {
    this.adminService.getDashboardNumbers().subscribe(
      res => {
        console.log('Dashboard: ', res);
        this.countDashboard = res;
      },
      error => {
        console.log('Dashboard: ', error);
      }
    );
  }
}
