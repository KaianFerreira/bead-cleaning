import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterService } from './router.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [CommonModule, RouterOutlet]
})
export class AppComponent {
  constructor(private routerService: RouterService) {};
  title = 'AERO Bead Cleaning - Goodyear';
}
