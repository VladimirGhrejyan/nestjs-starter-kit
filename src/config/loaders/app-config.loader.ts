import { registerAs } from '@nestjs/config';

import { configKeys } from '../common/constants';
import { EnvVarHelper } from '../common/helpers';
import { TGlobalConfig } from '../common/types';

export const appConfigLoader = registerAs<TGlobalConfig['app']>(configKeys.APP, () => ({
    nodeEnv: EnvVarHelper.get('NODE_ENV'),
    appUrl: EnvVarHelper.get('APP_URL'),
    port: EnvVarHelper.get('PORT'),
    serveStaticRoot: EnvVarHelper.get('SERVE_STATIC_ROOT'),
    serveStaticPath: EnvVarHelper.get('SERVE_STATIC_PATH'),
    appTitle: EnvVarHelper.get('APP_TITLE'),
    appVersion: EnvVarHelper.get('APP_VERSION'),
    swaggerUIPath: EnvVarHelper.get('SWAGGER_UI_PATH'),
    openApiSchemaPath: EnvVarHelper.get('OPEN_API_SCHEMA_PATH'),
    openApiSchemaName: EnvVarHelper.get('OPEN_API_SCHEMA_NAME'),
    swaggerUsername: EnvVarHelper.get('SWAGGER_USERNAME'),
    swaggerPassword: EnvVarHelper.get('SWAGGER_PASSWORD'),
    globalPrefix: EnvVarHelper.get('GLOBAL_PREFIX'),
}));
