import { createFeatureSelector } from '@ngrx/store';
import { FavoriteCharacter } from '../../interfaces/favorite.interface';

export const selectFavorite = createFeatureSelector<FavoriteCharacter | null>(
  'favorite'
);
