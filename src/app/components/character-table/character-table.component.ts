import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { DatePipe, CommonModule } from '@angular/common';
import { Character } from '../../interfaces/character.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { setFavorite } from '../../store/favorite/favorite.actions';

@Component({
  selector: 'app-character-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    RouterModule,
  ],
  templateUrl: './character-table.component.html',
  styleUrl: './character-table.component.scss',
  providers: [DatePipe],
})
export class CharacterTableComponent {
  @Input() dataSource: Character[] = [];
  @Input() displayedColumns: string[] = [];

  constructor(
    public datePipe: DatePipe,
    private router: Router,
    private store: Store
  ) {}

  get displayedColumnsWithActions(): string[] {
    return [...this.displayedColumns, 'acciones'];
  }

  getHeader(column: string): string {
    const headers: any = {
      name: 'Nombre',
      status: 'Status',
      species: 'Especie',
      type: 'Tipo',
      gender: 'Género',
      created: 'Creado',
    };
    return headers[column] || column;
  }

  getCellValue(character: Character, column: string): any {
    if (column === 'created') {
      return this.datePipe.transform(character.created, 'medium');
    }
    if (column === 'type') {
      return character.type || '-';
    }
    return (character as any)[column];
  }

  addToFavorite(character: { id: number; name: string }) {
    this.store.dispatch(setFavorite({ character }));
  }

  goToDetails(character: Character) {
    this.router.navigate(['/character', character.id]);
  }
}
