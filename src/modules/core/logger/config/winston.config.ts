import { LoggerOptions, format, transports } from 'winston';

export const winstonConfig: LoggerOptions = {
    level: 'info',

    format: format.combine(format.timestamp(), format.json()),

    transports: [new transports.Console()],
};
