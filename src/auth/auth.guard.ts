import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { expressJwtSecret } from 'jwks-rsa';
import { promisify } from 'util';
import * as jwt from 'express-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  private AUTH_AUDIENCE: string;
  private AUTH0_DOMAIN: string;

  constructor(private configService: ConfigService) {
    this.AUTH_AUDIENCE = configService.get<string>('AUTH_AUDIENCE');
    this.AUTH0_DOMAIN = `https://${configService.get<string>('AUTH0_DOMAIN')}/`;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.getArgByIndex(0);
    const res = context.getArgByIndex(1);

    const checkJwt = promisify(
      jwt({
        secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `${this.AUTH0_DOMAIN}.well-known/jwks.json`,
        }),
        audience: this.AUTH_AUDIENCE,
        issuer: this.AUTH0_DOMAIN,
        algorithms: ['RS256'],
      }),
    );

    try {
      await checkJwt(req, res);
      return true;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
