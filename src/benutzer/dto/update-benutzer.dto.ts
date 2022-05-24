import { PartialType } from '@nestjs/swagger';
import { CreateBenutzerDto } from './create-benutzer.dto';

export class UpdateBenutzerDto extends PartialType(CreateBenutzerDto) {}
