import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { TGlobalConfig } from '~config/common/types';

@Injectable()
export class CustomConfigService {
    constructor(private readonly configService: ConfigService<TGlobalConfig, true>) {}

    public get<Key extends keyof TGlobalConfig>(key: Key): TGlobalConfig[Key] {
        return this.configService.get(key, { infer: true });
    }
}
