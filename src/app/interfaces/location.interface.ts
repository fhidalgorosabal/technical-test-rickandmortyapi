import { Character } from './character.interface';

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export interface LocationInfo {
  location: Location | null;
  resident: Character | null;
}
