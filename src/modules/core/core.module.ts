import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

import { CustomConfigModule } from './custom-config';
import { LoggerModule } from './logger';
import { LoggerMiddleware } from './middleware';
import { OpenApiModule } from './open-api';
import { providers } from './providers';
import { ServeStaticModule } from './serve-static';

@Module({
    providers,
    imports: [CustomConfigModule, LoggerModule, ServeStaticModule, OpenApiModule],
    exports: [CustomConfigModule, LoggerModule, OpenApiModule],
})
export class CoreModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(LoggerMiddleware).forRoutes({ path: '*path', method: RequestMethod.ALL });
    }
}
