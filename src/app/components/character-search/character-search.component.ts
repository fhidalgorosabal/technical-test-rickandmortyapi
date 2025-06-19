import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { SearchFields } from '../../interfaces/search.interface';
import { AutoFocusDirective } from '../../directives/auto-focus.directive';

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
    AutoFocusDirective,
  ],
  templateUrl: './character-search.component.html',
  styleUrl: './character-serch.component.scss',
})
export class CharacterSearchComponent {
  @Output() search = new EventEmitter<SearchFields>();
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
