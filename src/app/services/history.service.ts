import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  baseUrl!: string;

  constructor(private http:HttpClient) { 
    this.baseUrl=environment.baseUrl;
  }
  public getAllfromHistory():Observable<any>
  {
    return this.http.get(`${this.baseUrl}`+"/history/get/all");
  }
  

}
