import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ServerException } from './exceptions/server.exception';
import { ErrorCode } from './exceptions/error-codes';
import helmet from 'helmet';
import { ServerExceptionFilter } from './filters/server-exception.filter';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const PORT = process.env.PORT || 8000;
  const app = await NestFactory.create(AppModule, {
    logger: ['debug'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: () => new ServerException(ErrorCode.ValidationError),
    }),
  );
  app.enableCors();
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.use(helmet());
  app.useGlobalFilters(new ServerExceptionFilter());

  await app.listen(PORT);
}
bootstrap();
