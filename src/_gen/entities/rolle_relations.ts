import { Berechtigung } from './berechtigung';
import { Benutzer } from './benutzer';
import { ApiProperty } from '@nestjs/swagger';

export class RolleRelations {
  @ApiProperty({ isArray: true, type: () => Berechtigung })
  berechtigungen: Berechtigung[];

  @ApiProperty({ isArray: true, type: () => Benutzer })
  benutzer: Benutzer[];
}
