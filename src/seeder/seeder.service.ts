import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { passwordEncryption } from 'src/utils/common';

@Injectable()
export class SeederService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async seedAdmin(): Promise<void> {
    const existingAdmin = await this.userModel.findOne({
      where: { access: 'admin' },
    });

    if (existingAdmin) {
      console.log('Admin user already exists.');
      return;
    }

    const hashedPassword = await passwordEncryption('Xmv02488!!');
    await this.userModel.create({
      firstName: 'Admin',
      lastName: 'Lenodux',
      email: 'admin@lenodux.com',
      access: 'admin',
      password: hashedPassword,
      status: 'active',
      countryCode: '+1',
      mobile: '9926516537',
    });
    console.log('Admin user created successfully.');
  }
}
