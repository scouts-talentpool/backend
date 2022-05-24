import { Campus } from './campus';
import { Lehrberuf } from './lehrberuf';
import { Benutzer } from './benutzer';
import { ApiProperty } from '@nestjs/swagger';

export class TalentRelations {
  @ApiProperty({ type: () => Campus })
  campus: Campus;

  @ApiProperty({ isArray: true, type: () => Lehrberuf })
  wunschberufe: Lehrberuf[];

  @ApiProperty({ isArray: true, type: () => Benutzer })
  benutzer: Benutzer[];
}
