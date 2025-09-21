import { env } from 'node:process';

import { TEnvironment } from '../types';

export class EnvVarHelper {
    static get<Key extends keyof TEnvironment>(key: Key): TEnvironment[Key] {
        return env[key] as TEnvironment[Key];
    }
}
