import { Type } from '@nestjs/common';

import { TGlobalConfig } from '~config/common/types';

import { NestLoggerService, PinoLoggerService, WinstonLoggerService } from '../drivers';

type TLoggerDriver = TGlobalConfig['logger']['driver'];

export class LoggerFactory {
    static getClass(driver: TLoggerDriver): Type<any> {
        const driversMap: Record<TLoggerDriver, Type<any>> = {
            nest: NestLoggerService,
            pino: PinoLoggerService,
            winston: WinstonLoggerService,
        };

        return driversMap[driver];
    }
}
