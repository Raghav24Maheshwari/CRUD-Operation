import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseConfig } from './database.config';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useClass: DatabaseConfig,
    }),
  ],
  // providers: [TwilioConfig, TwilioUtil],
  // exports: [TwilioConfig, TwilioUtil],
})
export class ConfigurationModule {}
