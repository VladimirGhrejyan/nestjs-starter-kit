import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { TEnvironment } from './env.types';

type AppConfig = {
    nodeEnv: TEnvironment['NODE_ENV'];

    port: TEnvironment['PORT'];

    appUrl: TEnvironment['APP_URL'];
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
