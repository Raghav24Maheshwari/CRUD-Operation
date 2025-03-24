// src/modules/admin/auth/auth.dbrepo.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../models/user.model';
import { Op } from 'sequelize';

@Injectable()
export class AuthDbRepo {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User
  ) {}

  async findUserById(id: number): Promise<User> {
    return this.userModel.findByPk(id);
  }
  async getUserByEmailOrId(emailOrId: string | number): Promise<User | null> {
    const where =
      typeof emailOrId === 'number' || /^\d+$/.test(String(emailOrId))
        ? { id: Number(emailOrId) }
        : { email: { [Op.iLike]: emailOrId } };

    return this.userModel.findOne({ where });
  }
}
