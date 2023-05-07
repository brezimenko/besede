import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors();

  app.use(cookieSession({
    keys: ['asdf']
  }))
  const config = new DocumentBuilder()
  .setTitle('SSKJ STOLEN, BABYYYYY API')
  .setDescription('Words API')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, config, {deepScanRoutes: true});
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
