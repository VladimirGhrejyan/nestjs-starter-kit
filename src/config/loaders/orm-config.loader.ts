import { registerAs } from '@nestjs/config';
import { resolve } from 'node:path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import { configKeys } from '../common/constants';
import { EnvVarHelper } from '../common/helpers';
import { TGlobalConfig } from '../common/types';

export const getOrmConfig = (): PostgresConnectionOptions => ({
    type: 'postgres',
    port: EnvVarHelper.get('POSTGRES_PORT'),
    host: EnvVarHelper.get('POSTGRES_HOST'),
    username: EnvVarHelper.get('POSTGRES_USERNAME'),
    password: EnvVarHelper.get('POSTGRES_PASSWORD'),
    database: EnvVarHelper.get('POSTGRES_DB'),
    entities: [resolve(__dirname, '../../orm/entities/**/*.entity.*{.ts,.js}')],
    namingStrategy: new SnakeNamingStrategy(),
    useUTC: true,
    synchronize: false,
    ssl: EnvVarHelper.get('DB_SSL') === 'true' ? { rejectUnauthorized: false } : undefined,
});

export const ormConfigLoader = registerAs<TGlobalConfig['orm']>(configKeys.ORM, () => ({
    ...getOrmConfig(),
    autoLoadEntities: true,
    retryAttempts: 5,
}));
