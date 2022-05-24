import { ApiProperty } from '@nestjs/swagger';
import { CreateUserData } from 'auth0';

export class Auth0CreateUserData implements CreateUserData {
  connection: string;

  @ApiProperty({ type: String })
  password: string;
}
