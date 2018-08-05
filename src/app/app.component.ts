import { Component, OnInit } from '@angular/core';
import { LoginService } from './common/services/login.service';
import { Subscription } from 'rxjs/Subscription';
import { Router,  NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LoginService]
})
export class AppComponent implements OnInit {
  spinner =  false;
  loginUrl: any;
  pageTitle = 'Dashboard';
  pageIcon = 'dashboard';
  navOptions: any;
  subscription: Subscription;
  menu = {
    loggedOut: [
       { label: 'Home', link: 'http://kspas.co.za/'},
       { label: 'About', link: 'http://kspas.co.za/about/'},
       { label: 'Services', link: 'http://kspas.co.za/services/'},
       {
         label: 'Products',
         dropdown: [
           { label: 'Society Benefit', link: 'http://kspas.co.za/society-benefit/'},
           { label: 'Grocery Benefit', link: 'http://kspas.co.za/grocery-benefit/'},
         ]
        },
       { label: 'Downloads', link: 'http://kspas.co.za/downloads/'},
       { label: 'Contacts', link: 'http://kspas.co.za/'},
    ],
    loggedIn: {
      user: [
        { label: 'My Profile', link: 'user/profile', icon: 'user', actions: []},
        { label: 'My Dependents', link: 'user/dependents', icon: 'heart', actions: []},
        { label: 'My Products', link: 'user/products', icon: 'gift', actions: []},
      ],
      admin: [
        { label: 'Users', link: 'admin/users', icon: 'user', actions: [
          {label: 'Add new user', link: 'admin/new-user', icon: 'plus'},
          {label: 'List all users', link: 'admin/list-users', icon: 'list'}
        ]},
        { label: 'Dependents', link: 'admin/dependents', icon: 'heart', actions: [
          {label: 'Add new dependent', link: 'admin/new-dependent', icon: 'plus'},
          {label: 'List all dependents', link: 'admin/list-dependents', icon: 'list'}
        ]},
        { label: 'Products', link: 'admin/products', icon: 'gift', actions: []},
      ]
    },
  };
  public logoutLink = false;
  public actions = [];
  public dashboardUrl;
  constructor(
    public loginService: LoginService,
    public router: Router,
    public route: ActivatedRoute,
  ) {}
  ngOnInit() {
    console.log('actions: ', this.actions);
    this.loginUrl = this.route.snapshot.queryParams['loginUrl'] || '/login';
    this.navOptions = {};
    this.subscription = this.loginService.loginStream$.subscribe(
      res => {
        if (res.roles[0] === 'administrator') {
          this.navOptions = this.menu.loggedIn.admin;
          this.logoutLink = true;
          this.dashboardUrl = '/admin';
        } else if (res.roles[0] === 'subscriber') {
          this.navOptions = this.menu.loggedIn.user;
          this.logoutLink = true;
          this.dashboardUrl = '/user';
        } else {
          this.navOptions = {};
        }
      }
    );
    if (Object.keys(this.navOptions).length === 0) {
      this.logout();
    }
  }
  logout (event?: any) {
    localStorage.removeItem('adminData');
    localStorage.removeItem('userData');
    this.router.navigate([this.loginUrl]);
    this.logoutLink = false;
    console.log('Logout:::clicked');
  }
  navLink(navOption) {
    this.pageTitle = navOption.label;
    this.pageIcon = navOption.icon;
    this.actions = this.navOptions.filter( res => res.label === this.pageTitle)[0].actions;
  }
  navDashboard() {
    this.pageTitle = 'Dashboard';
    this.actions = [];
  }
}
