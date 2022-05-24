import { Talent } from './talent';
import { Lehrstelle } from './lehrstelle';
import { ApiProperty } from '@nestjs/swagger';

export class LehrberufRelations {
  @ApiProperty({ isArray: true, type: () => Talent })
  talente: Talent[];

  @ApiProperty({ isArray: true, type: () => Lehrstelle })
  lehrstellen: Lehrstelle[];
}
