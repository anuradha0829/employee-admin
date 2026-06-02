import { Injectable } from '@angular/core';
import {
  HttpRequest, HttpHandler, HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Add a correlation-id header to every outgoing request
    const correlationId = `req-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

    const cloned = req.clone({
      setHeaders: { 'X-Correlation-Id': correlationId }
    });

    console.log(`[HTTP] ${cloned.method} ${cloned.url} | id: ${correlationId}`);

    return next.handle(cloned).pipe(
      tap(() => {
        // success – nothing extra needed
      }),
      catchError((error: HttpErrorResponse) => {
        // Build a problem-details style error object
        const problemDetail = {
          type: 'https://httpstatuses.com/' + error.status,
          title: this.getTitle(error.status),
          status: error.status,
          detail: error.message
        };

        console.error(`[HTTP ERROR] ${error.status} on ${req.url}`, problemDetail);

        return throwError(() => problemDetail);
      })
    );
  }

  private getTitle(status: number): string {
    const titles: Record<number, string> = {
      400: 'Bad Request',
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Not Found',
      409: 'Conflict',
      500: 'Internal Server Error'
    };
    return titles[status] ?? 'Unknown Error';
  }
}
