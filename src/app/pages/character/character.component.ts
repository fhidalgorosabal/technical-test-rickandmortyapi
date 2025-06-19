import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './character.component.html',
  styleUrls: [],
})
export class CharacterComponent implements OnInit {
  characters: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<any>('https://rickandmortyapi.com/api/character')
      .subscribe((data) => {
        this.characters = data.results;
      });
  }
}
