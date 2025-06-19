import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/character',
    pathMatch: 'full',
  },
  {
    path: 'character',
    loadComponent: () =>
      import('./pages/character/character.component').then(
        (m) => m.CharacterComponent
      ),
  },
  {
    path: 'character/:id',
    loadComponent: () =>
      import('./pages/character-details/character-details.component').then(
        (m) => m.CharacterDetailsComponent
      ),
  },
];
