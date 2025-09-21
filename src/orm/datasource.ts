import 'dotenv/config';
import { resolve } from 'node:path';
import { DataSource } from 'typeorm';

import { getOrmConfig } from '~config/loaders';

const datasource = new DataSource({
    ...getOrmConfig(),
    entities: [resolve(__dirname, 'entities/**/*.entity{.ts,.js}')],
});

export default datasource;
