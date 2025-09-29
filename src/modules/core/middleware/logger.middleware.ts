import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { BaseLogger, InjectLogger } from '../logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(@InjectLogger() private readonly logger: BaseLogger) {}

    use(req: Request, res: Response, next: NextFunction): void {
        const { method, originalUrl } = req;

        res.on('finish', () => {
            this.logger.log(`${method} ${originalUrl} ${res.statusCode}`, {
                ip: req.ip,
                userAgent: req.headers['user-agent'],
                contentLength: res.getHeader('content-length'),
            });
        });

        next();
    }
}
