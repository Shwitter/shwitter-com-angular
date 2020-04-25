import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = req.clone({
      setHeaders: {
        token: `${this.authService.getToken()}`
      }
    });
    return next.handle(request);
  }
}
