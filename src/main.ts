import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { SeederService } from './seeder/seeder.service';
import { ConfigService } from '@nestjs/config';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
  });
  const configService = app.get(ConfigService)
  const seederService = app.get(SeederService);
  await seederService.seedAdmin();
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors = []) => {
        if (validationErrors.length > 0) {
          const errorMessage = Object.values(
            validationErrors[0].constraints,
          )[0];
          return new HttpException(
            { statusCode: HttpStatus.BAD_REQUEST, message: errorMessage },
            HttpStatus.BAD_REQUEST,
          );
        }
      },
    }),
  );

  const port = configService.get<number>('PORT') || 2277;
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  await app.listen(port);
}
bootstrap();
