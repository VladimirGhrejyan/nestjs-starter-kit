import { TGlobalConfig } from '~config/common/types';

export const configKeys: Record<string, keyof TGlobalConfig> = {
    APP: 'app',
    AUTH: 'auth',
    ORM: 'orm',
} as const;
