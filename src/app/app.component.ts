import { Component, OnInit, HostListener } from '@angular/core';
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
  userDisplayName: any;
  pageIcon = 'dashboard';
  navOptions: any;
  subscription: Subscription;
  responsiveButton = false;
  menu = {
    loggedOut: [
       { label: 'Login', link: '/login', actions: []},
       { label: 'Register', link: '/register', actions: []},
       { label: 'Back to main site', link: 'http://kspas.co.za/', actions: []}
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
  user = JSON.parse( localStorage.getItem('userData'));

  constructor(
    public loginService: LoginService,
    public router: Router,
    public route: ActivatedRoute,
  ) {

  }
  ngOnInit() {
    this.user = JSON.parse( localStorage.getItem('userData'));
    console.log('actions: ', this.actions);
    console.log('this.user: ', this.user);
    this.loginUrl = this.route.snapshot.queryParams['loginUrl'] || '/login';
    this.navOptions = this.menu.loggedOut;
    this.subscription = this.loginService.loginStream$.subscribe(
      res => {
        console.log('RES: ', res.data);
        this.userDisplayName = res.data.display_name;
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
          this.logout();
        }
      },
      err => {
        this.dashboardUrl = '/login';
        this.logout();
      }
    );
    if (Object.keys(this.navOptions).length === 0) {
      this.logout();
    }
    if (this.navOptions === this.menu.loggedOut) {
      this.logout();
    }
  }
  logout (event?: any, link?: boolean) {
    this.navOptions = this.menu.loggedOut;
    this.responsiveButton = false;
    localStorage.removeItem('adminData');
    localStorage.removeItem('userData');
    this.router.navigate([this.loginUrl]);
    if (link) {
      // location.reload();

    }
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
  responsiveMenu() {
    this.responsiveButton = !this.responsiveButton;
    console.log(this.responsiveButton);
  }
}
