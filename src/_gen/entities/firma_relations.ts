import { Lehrstelle } from './lehrstelle';
import { Benutzer } from './benutzer';
import { ApiProperty } from '@nestjs/swagger';

export class FirmaRelations {
  @ApiProperty({ isArray: true, type: () => Lehrstelle })
  lehrstellen: Lehrstelle[];

  @ApiProperty({ isArray: true, type: () => Benutzer })
  benutzer: Benutzer[];
}
