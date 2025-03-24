import { Injectable } from '@nestjs/common';
import {
  SequelizeOptionsFactory,
  SequelizeModuleOptions,
} from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { Dialect } from 'sequelize';

@Injectable()
export class DatabaseConfig implements SequelizeOptionsFactory {
  constructor(private configService: ConfigService) {}

  createSequelizeOptions(): SequelizeModuleOptions {
    return {
      dialect: (this.configService.get<string>('DB_DIALECT') ||
        'postgres') as Dialect,
      host: this.configService.get<string>('DB_HOST'),
      port: +this.configService.get<number>('DB_PORT') || 5432,
      username: this.configService.get<string>('DB_USER'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      autoLoadModels: true,
      synchronize: true,
      sync: {
        alter: true
      },
      hooks: {
        afterConnect: () => {
          console.log('Database connected successfully!!!!');
        },
      },
    };
  }
}
