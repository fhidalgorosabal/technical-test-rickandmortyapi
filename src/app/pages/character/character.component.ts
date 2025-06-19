import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ApiRestService } from '../../services/api-rest.service';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [CommonModule, DatePipe, MatTableModule],
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

  constructor(private apiRestService: ApiRestService) {}

  ngOnInit(): void {
    this.apiRestService.getCharacters().subscribe((data) => {
      this.dataSource = data.results;
    });
  }
}
