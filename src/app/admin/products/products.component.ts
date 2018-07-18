import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams} from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ProductsService } from '../../common/services/products.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductsService]
})
export class ProductsComponent implements OnInit {
  public products;
  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.getProducts();
  }
  getProducts() {
    this.productsService.getProducts().subscribe(
      res => {
        this.products = res.posts;
        console.log('Res: ', res.posts);
      },
      err => {
        console.log('Err: ', err);
      }
      );
    }

}
