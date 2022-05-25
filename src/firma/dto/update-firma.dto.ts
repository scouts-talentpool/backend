import { PartialType } from '@nestjs/swagger';
import { PrismaModel } from 'src/_gen/entities';

export class UpdateFirmaDto extends PartialType(PrismaModel.Firma) {}
