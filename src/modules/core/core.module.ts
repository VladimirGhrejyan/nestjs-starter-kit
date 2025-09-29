import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

import { CustomConfigModule } from './custom-config';
import { LoggerModule } from './logger';
import { LoggerMiddleware } from './middleware';
import { providers } from './providers';

@Module({
    providers,
    imports: [CustomConfigModule, LoggerModule],
    exports: [CustomConfigModule, LoggerModule],
})
export class CoreModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(LoggerMiddleware).forRoutes({ path: '*path', method: RequestMethod.ALL });
    }
}
