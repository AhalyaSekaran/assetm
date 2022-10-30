import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
baseUrl:string;
  constructor(private http:HttpClient) {
    this.baseUrl=environment.baseUrl;
   }
  getCountOfAllLocation():Observable<any>
  {
    return this.http.get(`${this.baseUrl}/count/count/totallaptops`)
  }
  getCount(loc:String):Observable<any>
  {
    return this.http.get(`${this.baseUrl}/count/get/laptopcount/`+loc)
  }
  getCountOfUnAssignedAssets():Observable<any>
  {
    return this.http.get(`${this.baseUrl}/Assetcount/getall`);
  }

}
