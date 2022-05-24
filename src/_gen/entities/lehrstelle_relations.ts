import { Firma } from './firma';
import { Lehrberuf } from './lehrberuf';
import { ApiProperty } from '@nestjs/swagger';

export class LehrstelleRelations {
  @ApiProperty({ type: () => Firma })
  firma: Firma;

  @ApiProperty({ type: () => Lehrberuf })
  lehrberuf: Lehrberuf;
}
