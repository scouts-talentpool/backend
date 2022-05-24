import { Berechtigung as _Berechtigung } from './berechtigung';
import { BerechtigungRelations as _BerechtigungRelations } from './berechtigung_relations';
import { Rolle as _Rolle } from './rolle';
import { RolleRelations as _RolleRelations } from './rolle_relations';
import { Benutzer as _Benutzer } from './benutzer';
import { BenutzerRelations as _BenutzerRelations } from './benutzer_relations';
import { Talent as _Talent } from './talent';
import { TalentRelations as _TalentRelations } from './talent_relations';
import { Campus as _Campus } from './campus';
import { CampusRelations as _CampusRelations } from './campus_relations';
import { Lehrberuf as _Lehrberuf } from './lehrberuf';
import { LehrberufRelations as _LehrberufRelations } from './lehrberuf_relations';
import { Firma as _Firma } from './firma';
import { FirmaRelations as _FirmaRelations } from './firma_relations';
import { Lehrstelle as _Lehrstelle } from './lehrstelle';
import { LehrstelleRelations as _LehrstelleRelations } from './lehrstelle_relations';

export namespace PrismaModel {
  export class Berechtigung extends _Berechtigung {}
  export class BerechtigungRelations extends _BerechtigungRelations {}
  export class Rolle extends _Rolle {}
  export class RolleRelations extends _RolleRelations {}
  export class Benutzer extends _Benutzer {}
  export class BenutzerRelations extends _BenutzerRelations {}
  export class Talent extends _Talent {}
  export class TalentRelations extends _TalentRelations {}
  export class Campus extends _Campus {}
  export class CampusRelations extends _CampusRelations {}
  export class Lehrberuf extends _Lehrberuf {}
  export class LehrberufRelations extends _LehrberufRelations {}
  export class Firma extends _Firma {}
  export class FirmaRelations extends _FirmaRelations {}
  export class Lehrstelle extends _Lehrstelle {}
  export class LehrstelleRelations extends _LehrstelleRelations {}

  export const extraModels = [
    Berechtigung,
    BerechtigungRelations,
    Rolle,
    RolleRelations,
    Benutzer,
    BenutzerRelations,
    Talent,
    TalentRelations,
    Campus,
    CampusRelations,
    Lehrberuf,
    LehrberufRelations,
    Firma,
    FirmaRelations,
    Lehrstelle,
    LehrstelleRelations,
  ];
}
