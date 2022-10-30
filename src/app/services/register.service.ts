import { AdminDto } from './../dto/adminDto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
 
export class RegisterService {
  baseUrl!:string;
  constructor(private http:HttpClient) {
    this.baseUrl=environment.baseUrl;
   }
  registerAdmin(admin:AdminDto):Observable<any>{
    return this.http.post(`${this.baseUrl}/admin/add/admin`,admin);

  }
}
