import { Component, Input, Inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { DatePipe, CommonModule } from '@angular/common';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'app-character-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './character-table.component.html',
  providers: [DatePipe],
})
export class CharacterTableComponent {
  @Input() dataSource: Character[] = [];
  @Input() displayedColumns: string[] = [];

  constructor(public datePipe: DatePipe) {}

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
}
