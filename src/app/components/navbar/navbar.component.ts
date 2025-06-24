import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Observable } from 'rxjs';
import { selectFavorite } from '../../store/favorite/favorite.selectors';
import { FavoriteCharacter } from '../../interfaces/favorite.interface';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  title = 'Rick and Morty';

  favorite$: Observable<FavoriteCharacter | null>;

  constructor(private store: Store, private router: Router) {
    this.favorite$ = this.store.select(selectFavorite);
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  goToFavoriteDetails(id: number) {
    this.router.navigate(['/character', id]);
  }
}
