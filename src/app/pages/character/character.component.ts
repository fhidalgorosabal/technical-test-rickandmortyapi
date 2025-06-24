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
import { FooterComponent } from '../../components/footer/footer.component';

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
    FooterComponent,
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
  characters: any[] = [];
  totalCharacters = 0;
  pageSize = 20;
  currentPage = 1;

  destroy$ = new Subject<void>();

  constructor(private apiRestService: ApiRestService) {}

  ngOnInit(): void {
    this.getCharacters(this.currentPage);
  }

  getCharacters(page: number) {
    const filters = { name: this.nameFilter, status: this.statusFilter };
    this.apiRestService
      .getCharacters(filters, page)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.characters = response.results;
        this.dataSource = response.results;
        this.totalCharacters = response.info.count;
        this.currentPage = page;
      });
  }

  onSearch(filters: SearchFields) {
    this.nameFilter = filters.name ?? '';
    this.statusFilter = filters.status ?? '';
    this.getCharacters(1);
  }

  onClear() {
    this.nameFilter = '';
    this.statusFilter = '';
    this.getCharacters(1);
  }

  onPageChange(page: number) {
    this.getCharacters(page);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
