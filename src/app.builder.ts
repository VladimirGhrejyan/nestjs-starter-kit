import { INestApplication, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

import { CustomConfigService } from '~modules/core/custom-config';
import { OpenApiService } from '~modules/core/open-api';

export class AppBuilder {
    private readonly configService: CustomConfigService;

    constructor(private readonly app: INestApplication) {
        this.configService = app.get(ConfigService);
    }

    useSecurity(): this {
        this.app.use(helmet());
        return this;
    }

    useGlobalPrefix(): this {
        const prefix = this.configService.get('app').globalPrefix;
        this.app.setGlobalPrefix(prefix);
        return this;
    }

    enableCors(): this {
        this.app.enableCors({ origin: '*' });
        return this;
    }

    enableVersioning(): this {
        this.app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
        return this;
    }

    setupSwagger(): this {
        const openApiService = this.app.get(OpenApiService);
        openApiService.initOpenApi(this.app);
        return this;
    }

    async listen(): Promise<void> {
        const port = this.configService.get('app').port;

        await this.app.listen(port);
        console.log(`🚀 Server started on port ${port}`);
    }
}
