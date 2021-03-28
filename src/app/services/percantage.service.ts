import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Percantages } from '../models/Percantages';

@Injectable({
  providedIn: 'root'
})
export class PercantageService {

  path = 'https://localhost:44350/api/country/percantage'
  constructor(private http: HttpClient) { }

  getPercantages(): Observable<Percantages> {

    return this.http.get<Percantages>(this.path)
    
  }
}
