import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('b');
  const app = await NestFactory.create(AppModule);
  await app.listen(5000);
  logger.log('Application logger');
}
bootstrap();
