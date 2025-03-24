import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthorizationMiddleware } from 'src/middleware/authorization.middleware';
import { version } from '../../v1.constant';
import { UserDbRepo } from 'src/dbrepo/user.dbrepo';
import { JwtToken } from 'src/utils/jwtToken.util';
import { CommonDbRepo } from 'src/dbrepo/common.dbrepo';
import { User } from 'src/models/user.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, UserDbRepo, JwtToken, CommonDbRepo],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorizationMiddleware)
      .exclude(
        {
          path: `api/${version}/admin/auth/login`,
          method: RequestMethod.POST,
        },
        {
          path: `api/${version}/admin/auth/demo`,
          method: RequestMethod.POST,
        },
        {
          path: `api/${version}/admin/auth/add`,
          method: RequestMethod.POST,
        },
        {
          path: `api/${version}/admin/auth/test`,
          method: RequestMethod.POST,
        },
        {
          path: `api/${version}/admin/auth/forgot-password`,
          method: RequestMethod.POST,
        },
        {
          path: `api/${version}/admin/auth/reset-password`,
          method: RequestMethod.POST,
        },
      )
      .forRoutes(AuthController);
  }
}
