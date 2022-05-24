import { ApiProperty } from '@nestjs/swagger';

export class Campus {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  bezeichnung: string;

  @ApiProperty({ type: String })
  standort: string;
}
