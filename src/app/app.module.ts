import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BsDropdownModule, AccordionModule, ModalModule  } from 'ngx-bootstrap';
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
import { ProfileComponent } from './user/profile/profile.component';
import { UserProductsComponent } from './user/products/products.component';
import { UserDependentsComponent } from './user/dependents/dependents.component';
import { FilterdataPipe } from './common/pipes/filterdata.pipe';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { RegisterComponent } from './login/register/register.component';
import { ForgotComponent } from './login/forgot/forgot.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot', component: ForgotComponent },
  // User
  { path: 'user', component: UserComponent },
  { path: 'user/profile', component: ProfileComponent },
  { path: 'user/products', component: UserProductsComponent },
  { path: 'user/dependents', component: UserDependentsComponent },
  // Amin
  { path: 'admin', component: AdminComponent },
  { path: 'admin/list-users', component: UsersComponent },
  { path: 'admin/new-user', component: NewUserComponent },
  { path: 'admin/users', component: UsersComponent },
  { path: 'admin/dependents', component: DependentsComponent },
  { path: 'admin/list-dependents', component: DependentsComponent },
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
    ListDependentsComponent,
    ProfileComponent,
    UserProductsComponent,
    UserDependentsComponent,
    FilterdataPipe,
    RegisterComponent,
    ForgotComponent
  ],
  imports: [
    FilterPipeModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
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
