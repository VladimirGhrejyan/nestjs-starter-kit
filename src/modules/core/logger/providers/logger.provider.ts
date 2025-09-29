/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Provider } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

import { CustomConfigService } from '~modules/core/custom-config';

import { LOGGER_TOKEN } from '../constants';
import { LoggerFactory } from '../helpers';

export const loggerProvider: Provider = {
    provide: LOGGER_TOKEN,

    inject: [CustomConfigService, ModuleRef],

    useFactory: async (configService: CustomConfigService, moduleRef: ModuleRef) => {
        const driver = configService.get('logger').driver;

        const DriverClass = LoggerFactory.getClass(driver);

        let instance = moduleRef.get(DriverClass, { strict: false });

        if (!instance) {
            instance = await moduleRef.create(DriverClass);
        }

        return instance;
    },
};
