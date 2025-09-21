import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomConfigService } from '~modules/core/custom-config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [CustomConfigService],
            useFactory: (configService: CustomConfigService) => {
                return configService.get('orm');
            },
        }),
    ],

    exports: [TypeOrmModule],
})
export class DatabaseModule {}
