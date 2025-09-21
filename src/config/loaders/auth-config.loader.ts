import { registerAs } from '@nestjs/config';

import { configKeys } from '../common/constants';
import { EnvVarHelper } from '../common/helpers';
import { TGlobalConfig } from '../common/types';

export const authConfigLoader = registerAs<TGlobalConfig['auth']>(configKeys.AUTH, () => ({
    jwtSecret: EnvVarHelper.get('JWT_SECRET'),
    jwtExpiresIn: EnvVarHelper.get('JWT_ACCESS_EXPIRES_IN'),
}));
