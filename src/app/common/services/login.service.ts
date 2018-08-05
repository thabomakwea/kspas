import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams} from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Nonce } from '../../common/interfaces/nonce.interface';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable()
export class LoginService {
  private loginSource = new Subject<any>();
  private url = 'http://kspas.co.za/wp-json/custom-plugin/v1/login?';
  private urlRegister = 'http://kspas.co.za/wp-json/custom-plugin/v1/registerUser?';
  private urlForgotPass = 'http://kspas.co.za/wp-json/custom-plugin/v1/lostPassword?';

  // Observable Streams
 public  loginStream$ = this.loginSource.asObservable();
  constructor(private http: HttpClient) { }
  login(loginObj): Observable<any> {
    const body = this.serializeObj(loginObj.login);
    return this.http.post(this.url + body, httpOptions)
      .map( res => {
        return res;
      }, err => {
        return err;
      } );
  }
  registerUser(registerObj): Observable<any> {
    const body = this.serializeObj(registerObj);
    return this.http.post(this.urlRegister + body, httpOptions)
      .map( res => {
        return res;
      }, err => {
        return err;
      } );
  }
  forgotPassword(forgotPassObj): Observable<any> {
    const body = this.serializeObj(forgotPassObj);
    return this.http.post(this.urlForgotPass + body, httpOptions)
      .map( res => {
        return res;
      }, err => {
        return err;
      } );
  }
  logout() {
    localStorage.removeItem('currentUser');
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

  // Observables: Service Messages
  loginChange(data: any) {
    this.loginSource.next(data);
  }

}
