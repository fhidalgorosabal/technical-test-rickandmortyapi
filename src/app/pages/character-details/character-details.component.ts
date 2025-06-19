import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable, tap } from 'rxjs';
import { ApiRestService } from '../../services/api-rest.service';
import { Character } from '../../interfaces/character.interface';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    LoadingComponent,
  ],
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.scss',
})
export class CharacterDetailsComponent implements OnInit {
  character$ = new Observable<Character | null>();

  constructor(
    private route: ActivatedRoute,
    private apiRestService: ApiRestService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;

    this.character$ = this.apiRestService
      .getCharacterById(id)
      .pipe(tap((character) => character));
  }
}
