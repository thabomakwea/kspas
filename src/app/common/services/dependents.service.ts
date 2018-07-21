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
export class DependentsService {
  private dependentsSource = new Subject<any>();
  private url = 'http://kspas.co.za/api/get_recent_posts?post_type=dependents';
  private urlUser = 'http://kspas.co.za/api/get_recent_posts?post_type=dependents&';
  // Observable Streams
 public  dependentsStream$ = this.dependentsSource.asObservable();
  constructor(private http: HttpClient) { }

  getDependents(): Observable<any> {
    return this.http.get(this.url, httpOptions)
      .map( res => {
        return res;
      }, err => {
        return err;
      } );
  }

  getUsersDependents(dependentObj): Observable<any> {
    const body = this.serializeObj(dependentObj.userId);
    return this.http.get(this.urlUser + body, httpOptions)
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
