import { Inject } from '@nestjs/common';

import { LOGGER_TOKEN } from '../constants';

export const InjectLogger = () => Inject(LOGGER_TOKEN);
