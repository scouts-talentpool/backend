import { ApiProperty } from '@nestjs/swagger';

export class Firma {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  firmenname: string;

  @ApiProperty({ type: String })
  website: string;

  @ApiProperty({ type: String })
  strasse: string;

  @ApiProperty({ type: Number })
  plz: number;

  @ApiProperty({ type: String })
  ort: string;

  @ApiProperty({ type: String })
  firmenportrait: string;
}
