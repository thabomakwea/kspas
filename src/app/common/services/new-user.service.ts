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
export class NewUserService {
  private newUserSource = new Subject<any>();
  private url = 'http://kspas.co.za/wp-json/custom-plugin/v1/add_user?';
  // Observable Streams
 public  newUserStream$ = this.newUserSource.asObservable();
  constructor(private http: HttpClient) { }

   newUser(newUserObj): Observable<any> {
    const body = this.serializeObj(newUserObj);
    return this.http.post(this.url + body, httpOptions)
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
