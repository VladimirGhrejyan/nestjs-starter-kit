import { Module } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';

import { CoreModule } from '~modules/core';
import { InfraModule } from '~modules/infra';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ZodExceptionFilter } from './filters';
import { ZodValidationPipe } from './pipes';

@Module({
    imports: [CoreModule, InfraModule],

    controllers: [AppController],

    providers: [
        AppService,
        { provide: APP_PIPE, useClass: ZodValidationPipe },
        { provide: APP_FILTER, useClass: ZodExceptionFilter },
    ],
})
export class AppModule {}
