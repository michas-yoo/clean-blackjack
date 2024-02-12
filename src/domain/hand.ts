import { Card } from './card.ts';

export interface Hand {
  cards: Card[];
  score: number;
  dealCards(): void;
  addCard(card: Card): void;
}
