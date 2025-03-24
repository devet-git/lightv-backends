import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { exec } from 'child_process';
import { map, Observable } from 'rxjs';

/**
 * This Interceptor is used to transform the response data
 *
 * @export
 * @class TransformResponseInterceptor
 * @typedef {TransformResponseInterceptor}
 * @template T
 * @implements {NestInterceptor}
 */
@Injectable()
export class TransformResponseInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const method = request.method;
    const url = request.url;
    const statusCodeMapped = {
      GET: 200,
      POST: 201,
      PUT: 200,
      DELETE: 204,
    };

    const messageMapped = {
      GET: 'Get data successfully',
      POST: 'Create data successfully',
      PUT: 'Update data successfully',
      DELETE: 'Delete data successfully',
    };
    const startTime = Date.now();
    return next.handle().pipe(
      map((data) => ({
        timestamp: new Date().toISOString(),
        executionTime: `${Date.now() - startTime}ms`,
        success: true,
        statusCode: statusCodeMapped[method],
        message: messageMapped[method],
        httpUrl: url,

        data,
      })),
    );
  }
}
