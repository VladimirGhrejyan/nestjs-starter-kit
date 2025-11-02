import { Provider } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

import { ExceptionFilter } from './filters';
import { LoggingInterceptor, SerializerInterceptor } from './interceptors';
import { ValidationPipe } from './pipes';

export const providers: Provider[] = [
    {
        provide: APP_FILTER,
        useClass: ExceptionFilter,
    },

    {
        provide: APP_PIPE,
        useClass: ValidationPipe,
    },

    {
        provide: APP_INTERCEPTOR,
        useClass: SerializerInterceptor,
    },

    {
        provide: APP_INTERCEPTOR,
        useClass: LoggingInterceptor,
    },
];
