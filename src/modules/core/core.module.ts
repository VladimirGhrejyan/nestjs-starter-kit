import { Module } from '@nestjs/common';

import { CustomConfigModule } from './custom-config';

@Module({
    providers: [],
    imports: [CustomConfigModule],
    exports: [CustomConfigModule],
})
export class CoreModule {}
