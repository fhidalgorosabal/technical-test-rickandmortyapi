import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character } from '../interfaces/character.interface';
import { Response } from '../interfaces/response.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiRestService {
  private baseUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) {}

  getCharacters(): Observable<Response<Character[]>> {
    return this.http.get<Response<Character[]>>(`${this.baseUrl}/character`);
  }
}
