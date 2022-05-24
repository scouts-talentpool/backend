import { ApiProperty } from '@nestjs/swagger';

export class Lehrberuf {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  bezeichnung: string;
}
