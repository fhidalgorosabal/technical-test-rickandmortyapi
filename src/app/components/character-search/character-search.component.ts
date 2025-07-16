import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
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
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    AutoFocusDirective,
  ],
  templateUrl: './character-search.component.html',
  styleUrl: './character-serch.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterSearchComponent {
  @Output() search = new EventEmitter<SearchFields>();
  @Output() clear = new EventEmitter<void>();

  searchForm: FormGroup;
  statuses: string[] = ['alive', 'dead', 'unknown'];

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      name: [''],
      status: [''],
    });
  }

  onSearch() {
    if (this.searchForm.valid) {
      this.search.emit(this.searchForm.value);
    }
  }

  onClear() {
    this.searchForm.reset();
    this.clear.emit();
  }
}
