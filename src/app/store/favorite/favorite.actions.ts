import { createAction, props } from '@ngrx/store';
import { FavoriteCharacter } from '../../interfaces/favorite.interface';

export const setFavorite = createAction(
  '[Favorite] Set Favorite',
  props<{ character: FavoriteCharacter }>()
);
