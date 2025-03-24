import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
