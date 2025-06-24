import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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
  @Input() dataSource: Character[] = [];

  get speciesTotals(): { [key: string]: number } {
    return this.dataSource.reduce((acc, curr) => {
      acc[curr.species] = (acc[curr.species] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });
  }

  get typeTotals(): { [key: string]: number } {
    return this.dataSource.reduce((acc, curr) => {
      const type = curr.type || 'Sin tipo';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });
  }
}
