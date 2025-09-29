import { Module } from '@nestjs/common';

import { CoreModule } from '~modules/core';
import { InfraModule } from '~modules/infra';

import { AppController } from './app.controller';

@Module({
    imports: [CoreModule, InfraModule],

    controllers: [AppController],
})
export class AppModule {}
