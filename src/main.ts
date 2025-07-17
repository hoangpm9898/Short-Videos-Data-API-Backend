/* eslint-disable prettier/prettier */

import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './config';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LogLevel, ValidationPipe, VersioningType } from '@nestjs/common';
import { AllExceptionsFilter, HttpErrorFilter, HttpExceptionFilter } from '#root/common/filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: config.LOG_LEVEL as LogLevel[]
  });

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new HttpErrorFilter());

  // Swagger setup
  const configDocument = new DocumentBuilder()
    .setTitle('Short Videos Data API')
    .setDescription('API for managing and querying short videos data')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, configDocument);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.PORT);
}
bootstrap();
