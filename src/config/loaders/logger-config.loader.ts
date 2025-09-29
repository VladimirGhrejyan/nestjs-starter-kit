import { registerAs } from '@nestjs/config';

import { configKeys } from '../common/constants';
import { EnvVarHelper } from '../common/helpers';
import { TGlobalConfig } from '../common/types';

export const loggerConfigLoader = registerAs<TGlobalConfig['logger']>(configKeys.LOGGER, () => ({
    driver: EnvVarHelper.get('LOGGER_DRIVER'),
}));
