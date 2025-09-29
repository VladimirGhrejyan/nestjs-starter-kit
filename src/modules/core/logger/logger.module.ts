import { Global, Module, Provider } from '@nestjs/common';

import { pinoConfig, winstonConfig } from './config';
import { LOGGER_TOKEN, PINO_CONFIG_TOKEN, WINSTON_CONFIG_TOKEN } from './constants';
import { NestLoggerService, PinoLoggerService, WinstonLoggerService } from './drivers';
import { loggerProvider } from './providers';

const providers: Provider[] = [
    { provide: WINSTON_CONFIG_TOKEN, useValue: winstonConfig },

    { provide: PINO_CONFIG_TOKEN, useValue: pinoConfig },

    WinstonLoggerService,

    PinoLoggerService,

    NestLoggerService,

    loggerProvider,
];

@Global()
@Module({
    providers,
    exports: [LOGGER_TOKEN],
})
export class LoggerModule {}
