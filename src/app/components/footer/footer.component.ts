import {
  ChangeDetectionStrategy,
  Component,
  Input,
  computed,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  @Input() set dataSource(value: Character[]) {
    this._dataSource.set(value);
  }

  private _dataSource = signal<Character[]>([]);

  speciesTotals = computed(() => {
    return this._dataSource().reduce((acc, curr) => {
      acc[curr.species] = (acc[curr.species] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });
  });

  typeTotals = computed(() => {
    return this._dataSource().reduce((acc, curr) => {
      const type = curr.type || 'Sin tipo';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });
  });
}
