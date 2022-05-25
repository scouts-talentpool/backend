import { IntersectionType } from '@nestjs/swagger';
import { PrismaModel } from 'src/_gen/entities';
import { Auth0CreateUserData } from '../auth0-entities';

export class CreateBenutzerDto extends IntersectionType(
  PrismaModel.Benutzer,
  Auth0CreateUserData,
) {}
