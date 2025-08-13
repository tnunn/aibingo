import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

const FEATURES = [
  'Code Completion', 'Refactoring Suggestions', 'Writes Unit Tests', 'Explains Code',
  'Generates Regex', 'Auto-Commenting', 'Finds Bugs Early', 'Code Snippets',
  'Converts Code Between Languages', 'Suggests APIs', 'Optimizes Performance',
  'Debugging Help', 'Git Commit Messages', 'Translates Comments', 'Writes Docs',
  'StackOverflow Search', 'Code Review Tips', 'Terminal Commands', 'Test Coverage Insights',
  'Error Fixes', 'Suggests Edge Cases', 'Refactors Loops', 'Adds Logging', 'Security Suggestions'
];

@Component({
  selector: 'app-bingo-card',
  templateUrl: './bingo-card.component.html',
  styleUrls: ['./bingo-card.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class BingoCardComponent {
  grid: string[][] = [];
  marked: boolean[][] = [];
  callout: string = '';
  bingo: boolean = false;
  bingoLines: { type: 'row' | 'col' | 'diag', index: number }[] = [];

  constructor() {
    this.generateCard();
  }

  generateCard() {
    const shuffled = FEATURES.sort(() => 0.5 - Math.random());
    let idx = 0;
    this.grid = [];
    this.marked = [];
    for (let row = 0; row < 5; row++) {
      this.grid[row] = [];
      this.marked[row] = [];
      for (let col = 0; col < 5; col++) {
        if (row === 2 && col === 2) {
          this.grid[row][col] = 'Free Space';
          this.marked[row][col] = true;
        } else {
          this.grid[row][col] = shuffled[idx++];
          this.marked[row][col] = false;
        }
      }
    }
    this.callout = '';
    this.bingo = false;
    this.bingoLines = [];
  }

  toggleMark(row: number, col: number) {
    this.marked[row][col] = !this.marked[row][col];
    this.updateBingo();
  }

  updateBingo() {
    this.bingoLines = [];
    // Check rows
    for (let i = 0; i < 5; i++) {
      if (this.marked[i].every(m => m)) {
        this.bingoLines.push({ type: 'row', index: i });
      }
    }
    // Check columns
    for (let i = 0; i < 5; i++) {
      if (this.marked.map(row => row[i]).every(m => m)) {
        this.bingoLines.push({ type: 'col', index: i });
      }
    }
    // Check diagonals
    if ([0,1,2,3,4].every(i => this.marked[i][i])) {
      this.bingoLines.push({ type: 'diag', index: 0 });
    }
    if ([0,1,2,3,4].every(i => this.marked[i][4-i])) {
      this.bingoLines.push({ type: 'diag', index: 1 });
    }
    this.bingo = this.bingoLines.length > 0;
  }

  calloutFeature(): string {
    const flat = this.grid.flat().filter(f => f !== 'Free Space');
    return flat[Math.floor(Math.random() * flat.length)];
  }

  isBingoRow(row: number): boolean {
    return this.bingoLines.some(function(line) { return line.type === 'row' && line.index === row; });
  }
  isBingoCol(col: number): boolean {
    return this.bingoLines.some(function(line) { return line.type === 'col' && line.index === col; });
  }
  isBingoDiag(row: number, col: number): boolean {
    return this.bingoLines.some(function(line) {
      return line.type === 'diag' && ((line.index === 0 && row === col) || (line.index === 1 && row + col === 4));
    });
  }
}
