import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Table } from '../models/Table';
import { TableService } from '../services/table.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  addCountryForm:FormGroup
  constructor(private jwtHelper:JwtHelperService, private tableService:TableService,private router:Router,private formBuilder:FormBuilder) { 
    this.addCountryForm = this.formBuilder.group({

      countryName:['',Validators.required],
      
      maxLatitude:['',Validators.required],
      minLatitude:['',Validators.required],
      
      maxLongtitude:['',Validators.required],
      minLongtitude:['',Validators.required],
    })

  }
  
  countries: Table[]
  country:any
  searchTerm:string
  isUserAuthenticated(){
    const token:string = localStorage.getItem("jwt")

    if(token&&!this.jwtHelper.isTokenExpired(token)){
      return true
    }
    else{
      return false
    }
  }

  logOut(){
    localStorage.removeItem("jwt")
    this.router.navigateByUrl("/")
  }
  ngOnInit(): void {
    this.tableService.getAdminCountries().subscribe(data =>{
        this.countries=data
    })
    
    
  }
 postCountry(addCountryForm:FormGroup){
   const country ={
    "countryName":addCountryForm.value.countryName,
    "maxLatitude":addCountryForm.value.maxLatitude,
    "minLatitude":addCountryForm.value.minLatitude,
    "maxLongtitude":addCountryForm.value.maxLongtitude,
    "minLongtitude":addCountryForm.value.minLongtitude,
   }
   this.tableService.addCountry(JSON.stringify(country)).subscribe(response =>{
     location.reload()
     this.router.navigateByUrl('/admin')
   })
 }

}
