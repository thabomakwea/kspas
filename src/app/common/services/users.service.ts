import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams} from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UserLogginData } from '../interfaces/user.interface';
import { Nonce } from '../../common/interfaces/nonce.interface';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable()
export class UsersService {
  private listUsersSource = new Subject<any>();
  private urlUsers = 'http://kspas.co.za/wp-json/custom-plugin/v1/getUsers?';
  private urlUser = 'http://kspas.co.za/wp-json/custom-plugin/v1/getUserMeta?';
  private urlUpdateUser = 'http://kspas.co.za/wp-json/custom-plugin/v1/updateUser?';
  private urlUsersDependents = 'http://kspas.co.za/wp-json/custom-plugin/v1/getUsersDependents?';
  // Observable Streams
 public  listUsersStream$ = this.listUsersSource.asObservable();
  constructor(private http: HttpClient) { }

  getUsers(searchObj?: any): Observable<any>  {
    const body = searchObj ? this.serializeObj(searchObj) :  {Key: ''};
    return this.http.post(this.urlUsers + body, httpOptions)
      .map( res => {
       return res;
        // this.listUsersSource.next(res);
      }, err => {
        return err;
        // this.listUsersSource.next(err);
    } );
  }

  getUser(user_id): Observable<any> {
    const body = this.serializeObj(user_id);
    return this.http.post(this.urlUser + body, httpOptions)
      .map( res => {
        return res;
      }, err => {
        return err;
      } );
  }
  getUsersDependents(userObj): Observable<any> {
    const body = this.serializeObj(userObj);
    return this.http.post(this.urlUsersDependents + body, httpOptions)
      .map( res => {
        return res;
      }, err => {
        return err;
      } );
  }
  updateUser(userObj): Observable<any> {
    const body = this.serializeObj(userObj);
    return this.http.post(this.urlUpdateUser + body, httpOptions)
      .map( res => {
        return res;
      }, err => {
        return err;
      } );
  }
  serializeObj(obj) {
    const result = [];
    for (const property in obj) {
      if (property) {
        result.push(encodeURIComponent(property) + '=' + encodeURIComponent(obj[property]));
      }
    }
    return '' + result.join('&');
  }

}
