import { Component, Input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavBarComponent {
  @Input() title: string = '';

  constructor(private router: Router) {}

  goToHome() {
    this.router.navigateByUrl('character');
  }
}
