import { Injectable } from '@nestjs/common';
import { ZodValidationPipe as ZodDefaultValidationPipe } from 'nestjs-zod';

@Injectable()
export class ZodValidationPipe extends ZodDefaultValidationPipe {}
