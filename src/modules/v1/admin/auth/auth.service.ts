import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { CommonDbRepo } from 'src/dbrepo/common.dbrepo';
import { UserDbRepo } from 'src/dbrepo/user.dbrepo';
import { User } from 'src/models/user.model';
import { JwtToken } from 'src/utils/jwtToken.util';
import { AddDto } from './auth.dto';
import { passwordEncryption } from 'src/utils/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly userDBRepo: UserDbRepo,
    private readonly jwtToken: JwtToken,
    private readonly commonDbRepo: CommonDbRepo,
    private readonly configService: ConfigService,
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async demo1(): Promise<User[]> {
    return await this.commonDbRepo.getListAll<User>(this.userModel, {});
  }

  async getProfile(id: number): Promise<User> {
    return await this.commonDbRepo.getRow<User>(this.userModel, {
      where: { id },
    });
  }

  async add(addDto: AddDto): Promise<User> {
    const { first_name, last_name, email, password, mobile, country_code } =
      addDto;

    console.log('Tghis is teh data ', addDto);
    return;
    const existingUser = await this.commonDbRepo.getRow<User>(this.userModel, {
      where: { email },
    });

    if (existingUser) throw new Error('Email already exists');
    const hashedPassword = await passwordEncryption(password);
    const user = await this.commonDbRepo.create<User>(this.userModel, {
      firstName: first_name,
      lastName: last_name,
      email,
      password: hashedPassword,
      mobile,
      countryCode: country_code,
      access: 'admin',
      status: 'active',
    });

    return user;
  }
}
