import { Card } from './card.ts';

export interface Hand {
  name: string;
  cards: Card[];
  score: number;
  wins: number;
  dealCards(): void;
  addCard(card: Card): void;
}
