import { SetMetadata } from '@nestjs/common';
import { Rolle } from '@prisma/client';

export const ROLES_KEY = 'roles';
export const Rollen = (...rollen: Rolle[]) => SetMetadata(ROLES_KEY, rollen);
