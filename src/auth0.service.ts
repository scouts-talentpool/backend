import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ManagementClient, AuthenticationClient } from 'auth0';

@Injectable()
export class Auth0Service {
  //   public readonly authClient: AuthenticationClient;
  public readonly managementClient: ManagementClient;

  constructor(private readonly configService: ConfigService) {
    // this.authClient = new AuthenticationClient({
    //   domain: this.configService.get<string>('AUTH0_DOMAIN'),
    //   clientId: this.configService.get<string>('AUTH0_CLIENT_ID'),
    //   clientSecret: this.configService.get<string>('AUTH0_CLIENT_SECRET'),
    // });

    this.managementClient = new ManagementClient({
      domain: this.configService.get<string>('AUTH0_DOMAIN'),
      clientId: this.configService.get<string>('AUTH0_CLIENT_ID'),
      clientSecret: this.configService.get<string>('AUTH0_CLIENT_SECRET'),
      audience: this.configService.get<string>('AUTH0_AUDIENCE'),
      scope: 'create:users read:users delete:users',
    });
  }
}
