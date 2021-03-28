import { Line } from '@amcharts/amcharts4/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LineService {

  constructor(private http:HttpClient) { }
   
  path="https://localhost:44350/api/country/"

  
  getValuesByDate():Observable<any> {
       return this.http.get<any>(this.path+"valuesbydate")
  }
  getValuesByCountry(countryName):Observable<any> {
    return this.http.get<any>(this.path+"valuesbycountry/?countryName="+countryName)
}
}
