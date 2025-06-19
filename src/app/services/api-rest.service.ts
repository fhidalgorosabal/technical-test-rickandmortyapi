import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character } from '../interfaces/character.interface';
import { Response } from '../interfaces/response.interface';
import { SearchFields } from '../interfaces/search.interface';
import { Location } from '../interfaces/location.interface';
import { Episode } from '../interfaces/episode.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiRestService {
  private baseUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) {}

  getCharacters(filters: SearchFields = {}): Observable<Response<Character[]>> {
    let params = new HttpParams();
    if (filters.name) {
      params = params.set('name', filters.name);
    }
    if (filters.status) {
      params = params.set('status', filters.status);
    }
    return this.http.get<Response<Character[]>>(`${this.baseUrl}/character`, {
      params,
    });
  }

  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.baseUrl}/character/${id}`);
  }

  getLocationByUrl(url: string): Observable<Location> {
    return this.http.get<Location>(url);
  }

  getEpisodeByUrl(url: string): Observable<Episode> {
    return this.http.get<Episode>(url);
  }
}
