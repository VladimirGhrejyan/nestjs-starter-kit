import { Logger as WinstonLogger } from 'winston';

import { BaseLogger } from '../abstract';

export class WinstonAdapter extends BaseLogger {
    constructor(private readonly logger: WinstonLogger) {
        super();
    }

    child(meta: Record<string, any>): BaseLogger {
        const ch = this.logger.child(meta);
        return new WinstonAdapter(ch);
    }

    setContext(context: string): BaseLogger {
        return this.child({ context });
    }

    log(message: string, meta?: unknown): void {
        this.logger.info(message, meta);
    }

    error(message: string, trace?: string, meta?: unknown) {
        this.logger.error(message, { trace, ...(meta ?? {}) });
    }

    warn(message: string, meta?: unknown) {
        this.logger.warn(message, meta);
    }
}
