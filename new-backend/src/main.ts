import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Set a global path prefix
  // app.setGlobalPrefix('v1');

  // Generated API documentation on /api
  const options = new DocumentBuilder()
    .setTitle('DragonStack')
    .setDescription('DragonStack API description')
    .setVersion('1.0')
    .addTag('dragonstack')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  // Start the server
  await app.listen(3000);
}
bootstrap();
