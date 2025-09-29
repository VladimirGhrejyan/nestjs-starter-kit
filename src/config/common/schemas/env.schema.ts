import { z } from 'zod';

export const envSchema = z.object({
    // APP
    NODE_ENV: z.enum(['development', 'production']),
    APP_URL: z.url(),
    PORT: z.string().transform(Number),

    // DATABASE
    POSTGRES_HOST: z.string(),
    POSTGRES_USERNAME: z.string(),
    POSTGRES_PASSWORD: z.string(),
    POSTGRES_PORT: z.string().transform(Number),
    POSTGRES_DB: z.string(),
    DB_SSL: z.enum(['true', 'false']),

    // AUTH
    JWT_SECRET: z.string(),
    JWT_ACCESS_EXPIRES_IN: z.string(),

    // LOGGER
    LOGGER_DRIVER: z.enum(['nest', 'winston', 'pino']).default('nest'),
});
