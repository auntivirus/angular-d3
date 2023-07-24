import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  API_URL = "https://covid-19.dataflowkit.com/v1";
  // API_URL = "C:/Users/openspace/Desktop/Angular/Data Visualization/angular-d3/src/app/covid-data.json";
  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.API_URL);
  }
}
