import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

import { BaseLogger, InjectLogger } from '../logger';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(@InjectLogger() private readonly logger: BaseLogger) {}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const req = context.switchToHttp().getRequest<Request>();

        const { method, url } = req;

        const start = Date.now();

        return next.handle().pipe(
            tap(() => {
                const time = Date.now() - start;
                this.logger.log(`${method} ${url} - ${time}ms`);
            }),
        );
    }
}
