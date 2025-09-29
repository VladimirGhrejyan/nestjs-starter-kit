import { LoggerOptions } from 'pino';

export const pinoConfig: LoggerOptions = {
    level: 'info',

    transport: {
        target: 'pino-pretty',

        options: {
            colorize: true,

            translateTime: 'HH:MM:ss.l',

            ignore: 'pid,hostname',
        },
    },
};
