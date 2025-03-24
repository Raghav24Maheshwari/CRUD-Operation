import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtToken {
  constructor(private readonly configService: ConfigService) {}

  parse(jwtToken: string): any {
    return jwt.verify(
      jwtToken,
      this.configService.get<string>('JWT_TOKEN_API_ACCESS_TOKEN_SECRET'),
    );
  }

  create(obj: any): string {
    return jwt.sign(
      obj,
      this.configService.get<string>('JWT_TOKEN_API_ACCESS_TOKEN_SECRET'),
      { expiresIn: this.configService.get<string>('TokenExpTime') },
    );
  }
}
