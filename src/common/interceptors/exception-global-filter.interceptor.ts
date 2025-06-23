import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { isObject } from 'class-validator';
import { catchError, Observable } from 'rxjs';
import { RpcBaseException } from '../exceptions';

@Injectable()
export class ExceptionGlobalExceptionInterceptor implements NestInterceptor {
  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    console.log(' inside intceptor');
    return next.handle().pipe(
      catchError((error) => {
        if (error && error.isRpc && !(error instanceof HttpException)) {
          throw new HttpException(error.payload, error.status);
        }
        if (error && error.isPublic && !(error instanceof HttpException)) {
          throw new HttpException(error.payload, error.status);
        }
        if (error instanceof RpcBaseException) {
          throw new HttpException(error.getPayload(), error.getStatus());
        }
        throw error;
      }),
    );
  }
}
