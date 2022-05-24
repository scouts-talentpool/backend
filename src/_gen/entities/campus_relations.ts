import { Talent } from './talent';
import { ApiProperty } from '@nestjs/swagger';

export class CampusRelations {
  @ApiProperty({ isArray: true, type: () => Talent })
  talente: Talent[];
}
