import { ConfigModuleOptions } from '@nestjs/config';
import { resolve } from 'node:path';
import { cwd } from 'node:process';

import { EnvVarHelper } from '~config/common/helpers';
import { envSchema } from '~config/common/schemas';
import { appConfigLoader, authConfigLoader, ormConfigLoader } from '~config/loaders';

export const config: ConfigModuleOptions = {
    isGlobal: true,
    envFilePath: resolve(cwd(), `.env.${EnvVarHelper.get('NODE_ENV')}`),
    validate: (env) => envSchema.parse(env),
    validationOptions: { stripUnknown: true },
    load: [appConfigLoader, authConfigLoader, ormConfigLoader],
};
