import { Component, signal } from '@angular/core';
import { BingoCardComponent } from './bingo-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BingoCardComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ai-bingo');
}
