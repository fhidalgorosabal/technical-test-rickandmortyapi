import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character } from '../interfaces/character.interface';
import { Response } from '../interfaces/response.interface';
import { SearchFields } from '../interfaces/search.interface';

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
}
