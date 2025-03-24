import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { V1Module } from './modules/v1/v1.module';
import { ModelsModule } from './models/models.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigurationModule } from './config/config.module';
import { SeederModule } from './seeder/seeder.module';
import { JwtToken } from './utils/jwtToken.util';
import * as cors from 'cors';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: '.env',
    }),
    V1Module,
    ModelsModule,
    ModelsModule,
    ConfigurationModule,
    SeederModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtToken],
})
export class AppModule {
  constructor(private readonly configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cors({
          origin: this.configService.get<string>('CORS_ORIGIN') || '*',
          methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
          credentials: true,
        }),
      )
      .forRoutes('*');
  }
}
