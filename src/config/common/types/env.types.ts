import { z } from 'zod';

import { envSchema } from '../schemas';

export type TEnvironment = z.infer<typeof envSchema>;
