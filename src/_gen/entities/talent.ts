import { ApiProperty } from '@nestjs/swagger';

export class Talent {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  vorname: string;

  @ApiProperty({ type: String })
  nachname: string;

  @ApiProperty({ type: Number })
  plz: number;

  @ApiProperty({ type: String })
  wohnort: string;

  @ApiProperty({ type: Date })
  lehrbeginn: Date;

  @ApiProperty({ type: Number })
  campusId: number;
}
