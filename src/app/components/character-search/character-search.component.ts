import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-character-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './character-search.component.html',
})
export class CharacterSearchComponent {
  @Output() search = new EventEmitter<{ name: string; status: string }>();
  @Output() clear = new EventEmitter<void>();
  name: string = '';
  status: string = '';
  statuses: string[] = ['alive', 'dead', 'unknown'];

  onSearch() {
    this.search.emit({ name: this.name, status: this.status });
  }

  onClear() {
    this.name = '';
    this.status = '';
    this.clear.emit();
  }
}
