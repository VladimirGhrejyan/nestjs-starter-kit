import { NestFactory } from '@nestjs/core';

import { AppBuilder } from './app.builder';
import { AppModule } from './app/app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    await new AppBuilder(app)
        .useSecurity()
        .useGlobalPrefix()
        .enableCors()
        .enableVersioning()
        .setupSwagger()
        .listen();
}

bootstrap();
