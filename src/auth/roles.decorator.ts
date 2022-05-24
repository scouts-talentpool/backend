import { SetMetadata } from '@nestjs/common';
import { PrismaModel } from 'src/_gen/entities';

export const ROLES_KEY = 'roles';
export const Rollen = (...rollen: PrismaModel.Rolle[]) =>
  SetMetadata(ROLES_KEY, rollen);
