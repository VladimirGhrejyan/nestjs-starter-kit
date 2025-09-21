import { Module } from '@nestjs/common';

import { CoreModule } from '~modules/core';
import { InfraModule } from '~modules/infra';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [CoreModule, InfraModule],

    controllers: [AppController],

    providers: [AppService],
})
export class AppModule {}
