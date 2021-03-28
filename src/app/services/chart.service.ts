import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chart } from '../models/Chart';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

constructor(private http:HttpClient) { }
path="https://localhost:44350/api/city"

getCities():Observable<Chart[]>{
 return this.http.get<Chart[]>(this.path)
}



}
