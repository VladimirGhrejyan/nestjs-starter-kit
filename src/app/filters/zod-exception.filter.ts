import { ArgumentsHost, Catch, HttpException, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { ZodSerializationException } from 'nestjs-zod';
import { ZodError as ZodErrorV3 } from 'zod/v3';
import { ZodError as ZodErrorV4 } from 'zod/v4';

@Catch(HttpException)
export class ZodExceptionFilter extends BaseExceptionFilter {
    private readonly logger = new Logger(ZodExceptionFilter.name);

    public catch(exception: HttpException, host: ArgumentsHost) {
        if (exception instanceof ZodSerializationException) {
            const zodError = exception.getZodError();

            if (zodError instanceof ZodErrorV3 || zodError instanceof ZodErrorV4) {
                this.logger.error(`ZodSerializationException: ${zodError?.message}`);
            }
        }

        super.catch(exception, host);
    }
}
