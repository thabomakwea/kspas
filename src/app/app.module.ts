import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { LoginComponent } from './login/login/login.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginService } from './common/services/login.service';
import { HttpClientModule} from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { NewUserComponent } from './admin/new-user/new-user.component';
import { ListUsersComponent } from './admin/list-users/list-users.component';
import { UsersComponent } from './admin/users/users.component';
import { DependentsComponent } from './admin/dependents/dependents.component';
import { ProductsComponent } from './admin/products/products.component';
import { ReferralsComponent } from './admin/referrals/referrals.component';
import { NewDependentComponent } from './admin/new-dependent/new-dependent.component';
import { ListDependentComponent } from './admin/list-dependent/list-dependent.component';
import { ListDependentsComponent } from './admin/list-dependents/list-dependents.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/list-users', component: ListUsersComponent },
  { path: 'admin/new-user', component: NewUserComponent },
  { path: 'admin/users', component: UsersComponent },
  { path: 'admin/dependents', component: DependentsComponent },
  { path: 'admin/list-dependents', component: ListDependentsComponent },
  { path: 'admin/new-dependent', component: NewDependentComponent },
  { path: 'admin/products', component: ProductsComponent },
  { path: 'admin/referrals', component: ReferralsComponent },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: '**', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    AdminComponent,
    NewUserComponent,
    ListUsersComponent,
    UsersComponent,
    DependentsComponent,
    ProductsComponent,
    ReferralsComponent,
    NewDependentComponent,
    ListDependentComponent,
    ListDependentsComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
