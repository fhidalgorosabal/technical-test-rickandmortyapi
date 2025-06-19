import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiGraphqlService {
  private graphqlUrl = 'https://rickandmortyapi.com/graphql';

  constructor(private http: HttpClient) {}

  getCharacterFullDetailsById(id: number): Observable<any> {
    const query = `{
      character(id: ${id}) {
        id
        name
        status
        species
        type
        gender
        origin {
          id
          name
          type
          dimension
          residents { id name }
        }
        location {
          id
          name
          type
          dimension
          residents { id name }
        }
        episode {
          id
          name
          air_date
          episode
        }
        image
        created
      }
    }`;
    return this.http.post<any>(this.graphqlUrl, { query });
  }
}
