import { Injectable, Logger } from '@nestjs/common';

import { BaseLogger } from '../abstract';
import { NestLoggerAdapter } from '../adapters';

@Injectable()
export class NestLoggerService extends BaseLogger {
    private readonly root: Logger;
    private readonly adapter: NestLoggerAdapter;

    constructor() {
        super();
        this.root = new Logger();
        this.adapter = new NestLoggerAdapter(this.root);
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
