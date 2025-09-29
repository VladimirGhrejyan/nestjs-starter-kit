export interface ILogger {
    setContext(context: string): ILogger;

    log(message: string, ...optionalParams: any[]): void;

    error(message: string, ...optionalParams: any[]): void;

    warn(message: string, ...optionalParams: any[]): void;

    debug?(message: string, ...optionalParams: any[]): void;

    verbose?(message: string, ...optionalParams: any[]): void;

    fatal?(message: string, ...optionalParams: any[]): void;

    child?(meta: Record<string, any>): ILogger;
}
