import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserDbRepo } from 'src/dbrepo/user.dbrepo';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userDbRepo: UserDbRepo,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();

    if (request?.authData) {
      const id = request?.authData.id;
      const user = await this.userDbRepo.getUserByEmailOrId(id);
      if (user?.status !== 'active') return false;
      return roles.includes(user?.access);
    }

    return false;
  }
}
