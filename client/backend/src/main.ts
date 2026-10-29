import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import { resolve } from 'path';
import { AppModule } from './app.module';

config({ path: [resolve(__dirname, '..', '.env'), resolve(__dirname, '../../..', '.env')] });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: process.env.CORS_ORIGIN?.split(',').map((value) => value.trim()) ?? '*' });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port, '0.0.0.0');
}

void bootstrap();
