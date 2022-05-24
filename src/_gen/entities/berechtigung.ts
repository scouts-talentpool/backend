import { ApiProperty } from '@nestjs/swagger';

export class Berechtigung {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  bezeichnung: string;
}
