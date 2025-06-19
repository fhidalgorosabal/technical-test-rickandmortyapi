import { Episode } from './episode.interface';
import { Location } from './location.interface';

export interface Resident {
  id: string;
  name: string;
}

export interface CharacterGraphql {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Location;
  location: Location;
  episode: Episode[];
  image: string;
  created: string;
}

export interface CharacterGraphqlData {
  character: CharacterGraphql;
}

export interface CharacterGraphqlResponse {
  data: CharacterGraphqlData;
}
