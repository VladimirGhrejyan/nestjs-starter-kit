import { ILogger } from '../interfaces';

export abstract class BaseLogger implements ILogger {
    abstract setContext(context: string): BaseLogger;

    abstract log(message: string, meta?: unknown): void;

    abstract error(message: string, trace?: string, meta?: unknown): void;

    abstract warn(message: string, meta?: unknown): void;

    child?(meta: Record<string, any>): BaseLogger;
}
