import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { LoginDto } from './../../dto/loginDto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  token!:any;
  loginUrl!:string;
  constructor(private _cookie:CookieService,private http:HttpClient){
    this.loginUrl=environment.loginUrl;

   }
   isLogedIn(loginData:LoginDto):Observable<any>
   {    
    
     return this.http.post(`${this.loginUrl}`,loginData,{headers:{skip:"true"}});
    }
    logedInOrNot:any;
    checkLogin(){
      this.logedInOrNot =sessionStorage.getItem('login');
      if (this.logedInOrNot=='true'){
        return true
      }
      else{
        return false;
      }
    }
    getToken(){
      return sessionStorage.getItem('token');
    }
}

