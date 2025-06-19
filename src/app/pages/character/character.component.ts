import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ApiRestService } from '../../services/api-rest.service';
import { Character } from '../../interfaces/character.interface';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
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
  styleUrls: [],
})
export class CharacterComponent implements OnInit {
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
      .subscribe((data) => {
        this.dataSource = data.results;
      });
  }

  onSearch(filters: { name: string; status: string }) {
    this.nameFilter = filters.name;
    this.statusFilter = filters.status;
    this.getCharacters();
  }

  onClear() {
    this.nameFilter = '';
    this.statusFilter = '';
    this.getCharacters();
  }
}
