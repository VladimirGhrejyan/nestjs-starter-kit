import { Module } from '@nestjs/common';
import { ServeStaticModule as NestServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';
import { cwd } from 'node:process';

import { CustomConfigService } from '~modules/core/custom-config';

@Module({
    imports: [
        NestServeStaticModule.forRootAsync({
            inject: [CustomConfigService],

            useFactory: (configService: CustomConfigService) => {
                const appConfig = configService.get('app');

                const { serveStaticPath, serveStaticRoot } = appConfig;

                return [
                    {
                        rootPath: join(cwd(), serveStaticPath),
                        serveRoot: serveStaticRoot,
                    },
                ];
            },
        }),
    ],
})
export class ServeStaticModule {}
