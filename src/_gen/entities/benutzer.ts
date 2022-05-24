import { ApiProperty } from '@nestjs/swagger';

export class Benutzer {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  authId: string;

  @ApiProperty({ type: Number })
  rolleId: number;

  @ApiProperty({ type: Number })
  talentId: number;

  @ApiProperty({ type: Number })
  firmaId: number;
}
