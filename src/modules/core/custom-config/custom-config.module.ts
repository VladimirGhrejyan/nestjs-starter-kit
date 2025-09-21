import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { config } from './config';
import { CustomConfigService } from './custom-config.service';

@Global()
@Module({
    imports: [ConfigModule.forRoot(config)],
    providers: [ConfigService, CustomConfigService],
    exports: [CustomConfigService],
})
export class CustomConfigModule {}
