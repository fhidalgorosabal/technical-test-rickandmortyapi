import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [CommonModule, DatePipe, MatTableModule],
  templateUrl: './character.component.html',
  styleUrls: [],
})
export class CharacterComponent implements OnInit {
  characters: any[] = [];
  displayedColumns: string[] = [
    'name',
    'status',
    'species',
    'type',
    'gender',
    'created',
  ];
  dataSource: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<any>('https://rickandmortyapi.com/api/character')
      .subscribe((data) => {
        this.characters = data.results;
        this.dataSource = data.results;
      });
  }
}
