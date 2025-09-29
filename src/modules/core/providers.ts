import { Provider } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

import { ZodExceptionFilter } from './filters';
import { LoggingInterceptor } from './interceptors';
import { ZodValidationPipe } from './pipes';

export const providers: Provider[] = [
    {
        provide: APP_FILTER,
        useClass: ZodExceptionFilter,
    },

    {
        provide: APP_PIPE,
        useClass: ZodValidationPipe,
    },

    {
        provide: APP_INTERCEPTOR,
        useClass: LoggingInterceptor,
    },
];
