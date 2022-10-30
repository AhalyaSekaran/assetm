import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  baseUrl: string | undefined;

  constructor(private http:HttpClient) {
    this.baseUrl=environment.baseUrl;
  }

  downloadReport(purchaseDate:any,location:any, assetStatus:any):Observable<any>
  {
    return this.http.get(`${this.baseUrl}/downloadReport/`+location+"/"+purchaseDate+"/"+assetStatus,{responseType: 'blob'});
  }
  downloadReport1(location:any):Observable<any>
  {
    return this.http.post(`${this.baseUrl}/downloadReport/`+location+"/",{responseType: 'text'});
  }
  downloadReport2(purchaseDate:any):Observable<any>
  {
    return this.http.post(`${this.baseUrl}/downloadReport/`+purchaseDate+"/",{responseType: 'text'});
  }
  downloadReport3(assetStatus:any):Observable<any>
  {
    return this.http.post(`${this.baseUrl}/downloadReport/`+assetStatus+"/",{responseType: 'text'});
  }

}
