import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { env } from 'node:process';

import { CustomConfigService } from '~modules/core/custom-config';

import { AppModule } from './app/app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService: CustomConfigService = app.get(ConfigService);

    const PORT: number = configService.get('app').port;

    app.use(helmet());

    app.setGlobalPrefix('api');

    app.enableCors({
        origin: '*',
    });

    app.enableVersioning();

    await app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`, `Environment: ${env.NODE_ENV}`);
    });
}

bootstrap();
