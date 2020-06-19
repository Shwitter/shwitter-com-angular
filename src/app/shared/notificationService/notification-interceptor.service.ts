import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {NotificationService} from './notification.service';

@Injectable({providedIn: 'root'})
export class NotificationInterceptorService implements HttpInterceptor {
  constructor(private NotificationService: NotificationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = req.clone({
      setHeaders: {
        token: `${this.NotificationService.getToken()}`
      }
    });
    return next.handle(request);
  }
}
