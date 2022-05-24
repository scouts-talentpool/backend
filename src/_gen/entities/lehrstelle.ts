import { ApiProperty } from '@nestjs/swagger';

export class Lehrstelle {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Date })
  startjahr: Date;

  @ApiProperty({ type: Number })
  stellenanzahl: number = 1;

  @ApiProperty({ type: Number })
  firmaId: number;

  @ApiProperty({ type: Number })
  lehrberufId: number;
}
