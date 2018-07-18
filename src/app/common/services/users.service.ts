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
export class UsersService {
  private userSource = new Subject<any>();
  private url = 'http://kspas.co.za/wp-json/custom-plugin/v1/get_user';
  // Observable Streams
 public  userStream$ = this.userSource.asObservable();
  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(this.url, httpOptions)
      .map( res => {
        return res;
      }, err => {
        return err;
      } );
  }

}
