import { PartialType } from '@nestjs/swagger';
import { PrismaModel } from 'src/_gen/entities';

export class UpdateTalentDto extends PartialType(PrismaModel.Talent) {}
