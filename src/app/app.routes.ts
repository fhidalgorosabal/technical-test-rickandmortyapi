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
];
