import { Inject, Injectable } from '@nestjs/common';
import pino, { Logger as PinoLogger } from 'pino';
import type { LoggerOptions as PinoLoggerOptions } from 'pino';

import { BaseLogger } from '../abstract';
import { PinoAdapter } from '../adapters';
import { PINO_CONFIG_TOKEN } from '../constants';

@Injectable()
export class PinoLoggerService extends BaseLogger {
    private readonly root: PinoLogger;

    private readonly adapter: PinoAdapter;

    constructor(@Inject(PINO_CONFIG_TOKEN) private readonly config: PinoLoggerOptions) {
        super();
        this.root = pino(config);
        this.adapter = new PinoAdapter(this.root);
    }

    setContext(context: string): BaseLogger {
        return this.adapter.setContext(context);
    }

    child(meta: Record<string, any>): BaseLogger {
        return this.adapter.child(meta);
    }

    log(message: string, meta?: unknown): void {
        this.adapter.log(message, meta);
    }

    error(message: string, trace?: string, meta?: unknown): void {
        this.adapter.error(message, trace, meta);
    }

    warn(message: string, meta?: unknown): void {
        this.adapter.warn(message, meta);
    }
}
