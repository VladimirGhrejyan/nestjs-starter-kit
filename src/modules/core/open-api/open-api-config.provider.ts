import { FactoryProvider } from '@nestjs/common';
import { join } from 'node:path';

import { CustomConfigService } from '~modules/core/custom-config';

import { OPEN_API_CONFIG_TOKEN } from './common/constants';
import type { TOpenApiConfigType } from './common/types';

export const openApiConfigProvider: FactoryProvider<TOpenApiConfigType> = {
    provide: OPEN_API_CONFIG_TOKEN,

    inject: [CustomConfigService],

    useFactory: (configService: CustomConfigService) => {
        const appConfig = configService.get('app');

        const {
            appTitle,
            appVersion,
            swaggerUIPath,
            openApiSchemaName,
            openApiSchemaPath,
            serveStaticPath,
            swaggerUsername,
            swaggerPassword,
        } = appConfig;

        return {
            appTitle,
            appVersion,
            swaggerUIPath,
            swaggerUsername,
            swaggerPassword,
            outputPath: join(serveStaticPath, openApiSchemaPath),
            schemaName: openApiSchemaName,
        };
    },
};
