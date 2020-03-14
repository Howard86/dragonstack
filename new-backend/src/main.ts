import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as CookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { jwtConstants } from './auth/constants';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = new ConfigService().getPort();

  app.useGlobalPipes(new ValidationPipe());

  app.use(CookieParser(jwtConstants.secret));

  app.enableCors({
    origin: 'http://localhost:8080',
    credentials: true,
  });
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
  await app.listen(port);
}
bootstrap();
