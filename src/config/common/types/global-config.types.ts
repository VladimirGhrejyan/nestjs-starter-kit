import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { TEnvironment } from './env.types';

type AppConfig = {
    nodeEnv: TEnvironment['NODE_ENV'];

    port: TEnvironment['PORT'];

    appUrl: TEnvironment['APP_URL'];

    serveStaticRoot: TEnvironment['SERVE_STATIC_ROOT'];

    serveStaticPath: TEnvironment['SERVE_STATIC_PATH'];

    appTitle: TEnvironment['APP_TITLE'];

    appVersion: TEnvironment['APP_VERSION'];

    swaggerUIPath: TEnvironment['SWAGGER_UI_PATH'];

    openApiSchemaPath: TEnvironment['OPEN_API_SCHEMA_PATH'];

    openApiSchemaName: TEnvironment['OPEN_API_SCHEMA_NAME'];

    swaggerUsername: TEnvironment['SWAGGER_USERNAME'];

    swaggerPassword: TEnvironment['SWAGGER_PASSWORD'];

    globalPrefix: TEnvironment['GLOBAL_PREFIX'];
};

type AuthConfig = {
    jwtSecret: TEnvironment['JWT_SECRET'];

    jwtExpiresIn: TEnvironment['JWT_ACCESS_EXPIRES_IN'];
};

type LoggerConfig = {
    driver: TEnvironment['LOGGER_DRIVER'];
};

export type TGlobalConfig = {
    app: AppConfig;

    auth: AuthConfig;

    orm: TypeOrmModuleOptions;

    logger: LoggerConfig;
};
