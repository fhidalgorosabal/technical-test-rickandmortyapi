import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable, switchMap, map, of } from 'rxjs';
import { ApiRestService } from '../../services/api-rest.service';
import { Character } from '../../interfaces/character.interface';
import { LoadingComponent } from '../../components/loading/loading.component';
import { Location, LocationInfo } from '../../interfaces/location.interface';
import { Episode } from '../../interfaces/episode.interface';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    LoadingComponent,
  ],
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.scss',
})
export class CharacterDetailsComponent implements OnInit {
  characterDetails$ = new Observable<{ character: Character }>();

  originInfo$ = new Observable<LocationInfo>();
  locationInfo$ = new Observable<LocationInfo>();
  episodeInfo$ = new Observable<Episode | null>();

  constructor(
    private route: ActivatedRoute,
    private apiRestService: ApiRestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;
    this.getCharacterData(id);
  }

  getCharacterData(id: number) {
    this.characterDetails$ = this.apiRestService.getCharacterById(id).pipe(
      switchMap((character) => {
        this.originInfo$ = this.getLocation$(character.origin.url);
        this.locationInfo$ = this.getLocation$(character.location.url);
        this.episodeInfo$ = this.getEpisodeByUrl$(character.episode);
        return of({ character });
      })
    );
  }

  getLocation$(
    locationUrl: string
  ): Observable<{ location: Location | null; resident: Character | null }> {
    if (!locationUrl) {
      return of({ location: null, resident: null });
    }
    return this.apiRestService.getLocationByUrl(locationUrl).pipe(
      switchMap((location) => {
        if (!location.residents || location.residents.length === 0) {
          return of({ location, resident: null });
        }
        const firstResidentUrl = location.residents[0];
        const residentId = Number(firstResidentUrl.split('/').pop());
        return this.apiRestService
          .getCharacterById(residentId)
          .pipe(map((resident) => ({ location, resident })));
      })
    );
  }

  getEpisodeByUrl$(episodes: string[]): Observable<Episode | null> {
    if (!episodes || episodes.length === 0) {
      return of(null);
    }
    const firstEpisodeUrl = episodes[0];
    return this.apiRestService.getEpisodeByUrl(firstEpisodeUrl);
  }

  goToHome() {
    this.router.navigateByUrl('character');
  }
}
