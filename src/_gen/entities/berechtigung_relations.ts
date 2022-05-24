import { Rolle } from './rolle';
import { ApiProperty } from '@nestjs/swagger';

export class BerechtigungRelations {
  @ApiProperty({ isArray: true, type: () => Rolle })
  rollen: Rolle[];
}
