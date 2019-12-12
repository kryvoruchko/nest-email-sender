import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  HttpException,
  HttpStatus,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as clc from 'cli-color';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    call$: CallHandler,
  ): Observable<Response> {
    return call$.handle().pipe(
      catchError(error => {
        const http = context.switchToHttp();
        const { originalUrl, method } = http.getRequest();

        process.stdout.write(clc.red(`[APP] ${process.pid} - `));
        process.stdout.write(clc.red(method));
        process.stdout.write(clc.red(` ${originalUrl} - `));
        process.stdout.write(`${new Date(Date.now()).toLocaleString()} `);
        process.stdout.write('\n');

        console.error(error);

        return throwError(
          new HttpException(error, error.status || HttpStatus.BAD_REQUEST),
        );
      }),
    );
  }
}
