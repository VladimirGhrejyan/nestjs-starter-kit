import { Inject, Injectable } from '@nestjs/common';
import { Logger as WinstonLogger, createLogger } from 'winston';
import type { LoggerOptions as WinstonLoggerOptions } from 'winston';

import { BaseLogger } from '../abstract';
import { WinstonAdapter } from '../adapters';
import { WINSTON_CONFIG_TOKEN } from '../constants';

@Injectable()
export class WinstonLoggerService extends BaseLogger {
    private readonly root: WinstonLogger;

    private readonly adapter: WinstonAdapter;

    constructor(@Inject(WINSTON_CONFIG_TOKEN) private readonly config: WinstonLoggerOptions) {
        super();
        this.root = createLogger(config);
        this.adapter = new WinstonAdapter(this.root);
    }

    setContext(context: string): BaseLogger {
        return this.adapter.setContext(context);
    }

    log(message: string, meta?: unknown): void {
        this.adapter.log(message, meta);
    }

    error(message: string, trace?: string, meta?: unknown) {
        this.adapter.error(message, trace, meta);
    }

    warn(message: string, meta?: unknown) {
        this.adapter.warn(message, meta);
    }
}
