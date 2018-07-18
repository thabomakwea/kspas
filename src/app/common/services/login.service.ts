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
  private nonce = 'http://kspas.co.za/api/get_nonce/?controller=auth&method=generate_auth_cookie';
  private url = 'http://kspas.co.za/wp-json/custom-plugin/v1/login?';

  // Observable Streams
 public  loginStream$ = this.loginSource.asObservable();
  constructor(private http: HttpClient) { }

  getNonce(): Observable<any> {
   return this.http.get(this.nonce, httpOptions).map(
     res => {
       return res;
     },
     error => {
       return error;
     }
   );
  }
  login(loginObj): Observable<any> {
    const body = this.serializeObj(loginObj.login);
    return this.http.post(this.url + body, httpOptions)
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
