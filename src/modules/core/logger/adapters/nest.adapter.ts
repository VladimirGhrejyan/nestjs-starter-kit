import { Logger } from '@nestjs/common';

import { BaseLogger } from '../abstract';

export class NestLoggerAdapter extends BaseLogger {
    private context?: string;
    private readonly meta: Record<string, any>;

    constructor(
        private readonly logger: Logger,
        meta: Record<string, any> = {},
    ) {
        super();
        this.meta = meta;
    }

    setContext(context: string): BaseLogger {
        const clone = new NestLoggerAdapter(this.logger, this.meta);
        clone.context = context;
        return clone;
    }

    child(meta: Record<string, any>): BaseLogger {
        return new NestLoggerAdapter(this.logger, { ...this.meta, ...meta });
    }

    log(message: string, meta?: unknown): void {
        this.logger.log(this.formatMessage(message, meta), this.context);
    }

    error(message: string, trace?: string, meta?: unknown): void {
        const formatted = this.formatMessage(message, meta);
        this.logger.error(formatted, trace, this.context);
    }

    warn(message: string, meta?: unknown): void {
        this.logger.warn(this.formatMessage(message, meta), this.context);
    }

    private formatMessage(message: string, meta?: unknown): string {
        const mergedMeta = { ...this.meta, ...(meta ?? {}) };
        return Object.keys(mergedMeta).length
            ? `${message} | ${JSON.stringify(mergedMeta)}`
            : message;
    }
}
