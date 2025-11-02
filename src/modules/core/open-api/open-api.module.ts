import { Module } from '@nestjs/common';

import { openApiConfigProvider } from './open-api-config.provider';
import { OpenApiService } from './open-api.service';

@Module({
    providers: [openApiConfigProvider, OpenApiService],

    exports: [OpenApiService],
})
export class OpenApiModule {}
