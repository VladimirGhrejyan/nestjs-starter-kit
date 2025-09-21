import { registerAs } from '@nestjs/config';

import { configKeys } from '../common/constants';
import { EnvVarHelper } from '../common/helpers';
import { TGlobalConfig } from '../common/types';

export const appConfigLoader = registerAs<TGlobalConfig['app']>(configKeys.APP, () => ({
    nodeEnv: EnvVarHelper.get('NODE_ENV'),
    appUrl: EnvVarHelper.get('APP_URL'),
    port: EnvVarHelper.get('PORT'),
}));
