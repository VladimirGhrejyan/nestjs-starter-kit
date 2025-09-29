import { Logger as PinoLogger } from 'pino';

import { BaseLogger } from '../abstract';

export class PinoAdapter extends BaseLogger {
    constructor(private readonly logger: PinoLogger) {
        super();
    }

    child(meta: Record<string, any>): BaseLogger {
        const ch = this.logger.child(meta);
        return new PinoAdapter(ch);
    }

    setContext(context: string): BaseLogger {
        return this.child({ context });
    }

    log(message: string, meta?: unknown): void {
        this.logger.info(meta ?? {}, message);
    }

    error(message: string, trace?: string, meta?: unknown): void {
        this.logger.error({ ...(meta ?? {}), trace }, message);
    }

    warn(message: string, meta?: unknown): void {
        this.logger.warn(meta ?? {}, message);
    }
}
