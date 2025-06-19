import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiRestService } from '../../services/api-rest.service';
import { Character } from '../../interfaces/character.interface';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.scss',
})
export class CharacterDetailsComponent implements OnInit {
  character: Character | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private apiRestService: ApiRestService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.error = 'ID de personaje inválido.';
      this.loading = false;
      return;
    }
    this.loading = true;
    this.apiRestService.getCharacterById(id).subscribe({
      next: (character) => {
        this.character = character;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo cargar el personaje.';
        this.loading = false;
      },
    });
  }
}
