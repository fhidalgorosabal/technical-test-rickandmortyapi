import { Action, createReducer, on } from '@ngrx/store';
import { setFavorite } from './favorite.actions';
import { FavoriteCharacter } from '../../interfaces/favorite.interface';

export const initialState: FavoriteCharacter | null = null;

const _favoriteReducer = createReducer<FavoriteCharacter | null>(
  initialState,
  on(setFavorite, (state, { character }) => character)
);

export function favoriteReducer(
  state: FavoriteCharacter | null | undefined,
  action: Action
) {
  return _favoriteReducer(state ?? initialState, action);
}
