import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { Subject, takeUntil } from 'rxjs';
import { LoadingComponent } from '../../components/loading/loading.component';
import { GenderEsPipe } from '../../pipes/gender-es.pipe';
import { ApiGraphqlService } from '../../services/api-graphql.service';

@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    LoadingComponent,
    GenderEsPipe,
  ],
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.scss',
})
export class CharacterDetailsComponent implements OnInit, OnDestroy {
  character: any = null;
  originResident: any = null;
  locationResident: any = null;
  firstEpisode: any = null;
  loading = true;

  destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private apiGraphqlService: ApiGraphqlService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;
    this.apiGraphqlService
      .getCharacterFullDetailsById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        const char = res.data.character;
        this.character = char;
        this.originResident = char.origin?.residents?.[0] || null;
        this.locationResident = char.location?.residents?.[0] || null;
        this.firstEpisode = char.episode?.[0] || null;
        this.loading = false;
      });
  }

  goToHome() {
    this.router.navigateByUrl('character');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
