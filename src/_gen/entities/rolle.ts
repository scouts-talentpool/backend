import { ApiProperty } from '@nestjs/swagger';

export class Rolle {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  bezeichnung: string;
}
