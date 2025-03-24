import { Module } from '@nestjs/common';
import { User } from './user.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  exports: [SequelizeModule],
})
export class ModelsModule {}
