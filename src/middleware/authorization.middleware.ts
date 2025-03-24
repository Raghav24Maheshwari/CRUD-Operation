import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtToken } from '../utils/jwtToken.util';
import { Request, Response, NextFunction } from 'express';
import { getJwtTokenFromHeader } from 'src/utils/api.util';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  constructor(private readonly jwtToken: JwtToken) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = getJwtTokenFromHeader(req);
    if (!token) throw new UnauthorizedException('No token provided');
    try {
      const authData = this.jwtToken.parse(token);
      console.log('This is the token========> ', authData);
      (req as any).authData = authData;

      next();
    } catch (err) {
      console.log('This is the error jwt', err.message);
      throw new UnauthorizedException(err.message);
    }
  }
}

// import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// export const AuthData = createParamDecorator(
//   (data: unknown, ctx: ExecutionContext) => {
//     const request = ctx.switchToHttp().getRequest();
//     return request.authData; // Retrieve authData from the request object
//   },
// );
