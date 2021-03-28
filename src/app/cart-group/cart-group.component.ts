import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../models/Cart';
import { Table } from '../models/Table';
import { CartService } from '../services/cart.service';
import { TableService } from '../services/table.service';

@Component({
  selector: 'app-cart-group',
  templateUrl: './cart-group.component.html',
  styleUrls: ['./cart-group.component.css']
})
export class CartGroupComponent implements OnInit {

  constructor(private CartService: CartService,private TableService: TableService,private router:Router) { }
  cart: Cart
  changedValues:Cart
  selectedObject
  countries:Table[]
  ngOnInit(): void {
    this.CartService.getValues().subscribe(data => {

      this.cart = data
    })
   this.CartService.getlastInsertedValues().subscribe(data=>{
     this.changedValues=data
   })

    this.TableService.getCountries().subscribe(dt =>{
      this.countries = dt
    })
       
     
    
  }
  
  callType(selectedObject) {
    this.router.navigateByUrl(selectedObject);
  }

}
