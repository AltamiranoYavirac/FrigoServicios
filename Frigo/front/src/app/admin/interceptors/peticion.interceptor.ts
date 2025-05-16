import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable()
export class peticionInterceptor implements HttpInterceptor{

  constructor(private router:Router){}
  intercept(req: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Request URL'+req.url)

    const token= localStorage.getItem('access_token')

    let peticion=req.clone({
      setHeaders:{
        'Accept':'application/json',
        'Authorization':'Bearer '+token 
    }})
    return handler.handle(peticion).pipe(tap(()=>{},
  
    (error:any)=>{
      console.log("ERRORRRRRRR capa 8")
      if (error instanceof HttpErrorResponse){
        if(error.status!== 401){
          return
        }
        localStorage.removeItem('access_token')
        this.router.navigate(["auth/login"])
      }
    }
  ))
  }
}