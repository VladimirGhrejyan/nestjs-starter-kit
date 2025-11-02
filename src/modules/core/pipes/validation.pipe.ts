import { Injectable } from '@nestjs/common';
import { ZodValidationPipe as ZodDefaultValidationPipe } from 'nestjs-zod';

@Injectable()
export class ValidationPipe extends ZodDefaultValidationPipe {}
