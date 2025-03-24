import { Request } from 'express';

export function getJwtTokenFromHeader(req: Request): string | undefined {
  const authHeader = req.headers['authorization'];
  if (authHeader && typeof authHeader === 'string') {
    const [, token] = authHeader.split(' ');
    return token || undefined;
  }
  return undefined;
}
