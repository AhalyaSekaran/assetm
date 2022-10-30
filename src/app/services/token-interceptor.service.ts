import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable,Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './authendication/auth.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector:Injector) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authservice=this.injector.get(AuthService);
      let  tokeninzeReq=req.clone({
        setHeaders:{Authorization: `Bearer ${authservice.getToken()}`}
      })
      if (req.headers.get("skip")){
        return next.handle(req)
      }else
      {
        return next.handle(tokeninzeReq)
      }
       // console.log(tokeninzeReq);

  }
}
