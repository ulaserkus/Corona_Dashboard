import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../models/Cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  path = 'https://localhost:44350/api/country'
  
  getValues(): Observable<Cart> {

    return this.http.get<Cart>(this.path+"/values")
  }

  getlastInsertedValues():Observable<Cart>{
     
    return this.http.get<Cart>(this.path+'/changedvalues')
  }

}
