import { Rolle } from './rolle';
import { Talent } from './talent';
import { Firma } from './firma';
import { ApiProperty } from '@nestjs/swagger';

export class BenutzerRelations {
  @ApiProperty({ type: () => Rolle })
  rolle: Rolle;

  @ApiProperty({ type: () => Talent })
  talent: Talent;

  @ApiProperty({ type: () => Firma })
  firma: Firma;
}
