import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ShwittService} from "./shwitt.service";

@Injectable({providedIn: 'root'})
export class ShwittInterceptorService implements HttpInterceptor {
  constructor(private ShwittService: ShwittService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = req.clone({
      setHeaders: {
        token: `${this.ShwittService.getToken()}`
      }
    });
    return next.handle(request);
  }
}
