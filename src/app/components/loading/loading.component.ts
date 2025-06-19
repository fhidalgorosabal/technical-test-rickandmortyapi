import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <div class="loading">
      <mat-spinner></mat-spinner>
    </div>
  `,
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {}
