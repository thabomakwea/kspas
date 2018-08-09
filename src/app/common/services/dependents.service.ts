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
  private urlNewDependent = 'http://kspas.co.za/wp-json/custom-plugin/v1/newDependent?';
  private urlUpdateDependent = 'http://kspas.co.za/wp-json/custom-plugin/v1/updateDependent?';
  private urlDeleteDependent = 'http://kspas.co.za/wp-json/custom-plugin/v1/deleteDependent?';
  private urlSearch = 'http://kspas.co.za/wp-json/custom-plugin/v1/getSearchResults?';
  // Observable Streams
 public  dependentsStream$ = this.dependentsSource.asObservable();
  constructor(private http: HttpClient) { }

  getDependents(): Observable<any> {
    return this.http.post(this.url, httpOptions)
      .map( res => {
        return res;
      }, err => {
        return err;
      } );
  }
  addDependent(dependentObj) {
    const body = this.serializeObj(dependentObj);
    return this.http.post(this.urlNewDependent + body, httpOptions)
      .map( res => {
        return res;
      }, err => {
        return err;
      } );
  }
  updateDependent(dependentObj) {
    const body = this.serializeObj(dependentObj);
    return this.http.post(this.urlUpdateDependent + body, httpOptions)
      .map( res => {
        return res;
      }, err => {
        return err;
      } );
  }
  deleteDependent(dependentObj) {
    const body = this.serializeObj(dependentObj);
    return this.http.post(this.urlDeleteDependent + body, httpOptions)
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

  searchDependents(searchObj) {
    const body = this.serializeObj(searchObj);
    return this.http.post(this.urlSearch + body, httpOptions)
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
