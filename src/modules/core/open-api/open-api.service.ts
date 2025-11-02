import { INestApplication, Inject, Injectable } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import basicAuth from 'express-basic-auth';
import { cleanupOpenApiDoc } from 'nestjs-zod';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { cwd } from 'node:process';

import { OPEN_API_CONFIG_TOKEN } from './common/constants';
import type { TOpenApiConfigType } from './common/types';

@Injectable()
export class OpenApiService {
    constructor(@Inject(OPEN_API_CONFIG_TOKEN) private readonly config: TOpenApiConfigType) {}

    public initOpenApi(app: INestApplication): void {
        this.addBasicAuth(app);

        const document = this.setupSwagger(app);

        this.createOpenApiDocument(document);
    }

    private setupSwagger(app: INestApplication): OpenAPIObject {
        const swaggerConfig = new DocumentBuilder()
            .setTitle(this.config.appTitle)
            .setVersion(this.config.appVersion)
            .addBearerAuth()
            .build();

        const openApiDocument = SwaggerModule.createDocument(app, swaggerConfig);

        SwaggerModule.setup(this.config.swaggerUIPath, app, cleanupOpenApiDoc(openApiDocument), {
            swaggerOptions: {
                persistAuthorization: true,
            },
        });

        return openApiDocument;
    }

    private createOpenApiDocument(document: OpenAPIObject): void {
        const outputDirectory = join(cwd(), this.config.outputPath);

        const outputPath = join(outputDirectory, this.config.schemaName);

        if (!existsSync(outputDirectory)) {
            mkdirSync(outputDirectory, { recursive: true });
        }

        writeFileSync(outputPath, JSON.stringify(document, null, 2));
    }

    private addBasicAuth(app: INestApplication): void {
        app.use(
            this.config.swaggerUIPath,
            basicAuth({
                challenge: true,
                users: {
                    [this.config.swaggerUsername]: this.config.swaggerPassword,
                },
            }),
        );
    }
}
