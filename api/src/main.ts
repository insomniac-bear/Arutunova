import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ServerException } from './exceptions/server.exception';
import { ErrorCode } from './exceptions/error-codes';
import helmet from 'helmet';
import { ServerExceptionFilter } from './filters/server-exception.filter';

async function bootstrap() {
  const PORT = process.env.PORT || 8000;
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: () => new ServerException(ErrorCode.ValidationError),
    }),
  );
  app.enableCors();
  app.use(helmet());
  app.useGlobalFilters(new ServerExceptionFilter());

  await app.listen(PORT);
}
bootstrap();
