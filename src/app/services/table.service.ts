import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Detail } from '../models/detail';
import { Table } from '../models/Table';
import { map } from 'rxjs/operators';
import { CountryDetail } from '../models/CountryDetail';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private http: HttpClient) { }

  path = 'https://localhost:44350/api/country'

  headers = new HttpHeaders().set('Content-Type', 'application/json')
    


  getCountries(): Observable<Table[]> {

    return this.http.get<Table[]>(this.path )
  }
  getCountriesOrderByName(): Observable<Table[]> {

    return this.http.get<Table[]>(this.path+"/orderbyname")
  }
  getCountriesOrderByPatient(): Observable<Table[]> {

    return this.http.get<Table[]>(this.path+"/orderbypatient")
  }
  getCountriesOrderByDeath(): Observable<Table[]> {

    return this.http.get<Table[]>(this.path+"/orderbydeath")
  }
  getCountriesOrderByCure(): Observable<Table[]> {

    return this.http.get<Table[]>(this.path+"/orderbycure")
  }

  getCountryId(countryName): Observable<number> {
    return this.http.get<number>(this.path + "/countryId/?countryName=" + countryName)
  }

  getAdminCountries(): Observable<Table[]> {

    return this.http.get<Table[]>(this.path + "/admin")
  }


  getCountriesByName(countryName): Observable<Detail[]> {
    return this.http.get<Detail[]>(this.path + "/detail/?countryName=" + countryName)
  }

  addDetail(postBody):Observable<CountryDetail> {
    return this.http.post<CountryDetail>(this.path + "/addDetail", postBody,{headers:this.headers})
    
  }

  addCountry(addCountryForm) {
    return this.http.post(this.path + "/addCountry", addCountryForm, { headers: this.headers, responseType: 'text' })
  }


}
