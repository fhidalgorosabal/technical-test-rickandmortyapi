import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { Subject, takeUntil } from 'rxjs';
import { ApiRestService } from '../../services/api-rest.service';
import { Character } from '../../interfaces/character.interface';
import { SearchFields } from '../../interfaces/search.interface';
import { CharacterSearchComponent } from '../../components/character-search/character-search.component';
import { CharacterTableComponent } from '../../components/character-table/character-table.component';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    CharacterSearchComponent,
    CharacterTableComponent,
  ],
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss',
})
export class CharacterComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'name',
    'status',
    'species',
    'type',
    'gender',
    'created',
  ];
  dataSource: Character[] = [];
  nameFilter: string = '';
  statusFilter: string = '';
  statuses: string[] = ['alive', 'dead', 'unknown'];

  destroy$ = new Subject<void>();

  constructor(private apiRestService: ApiRestService) {}

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters(): void {
    this.apiRestService
      .getCharacters({
        name: this.nameFilter,
        status: this.statusFilter,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => (this.dataSource = data.results));
  }

  onSearch(filters: SearchFields) {
    this.nameFilter = filters.name ?? '';
    this.statusFilter = filters.status ?? '';
    this.getCharacters();
  }

  onClear() {
    this.nameFilter = '';
    this.statusFilter = '';
    this.getCharacters();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
