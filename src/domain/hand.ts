import { Card } from './card.ts';

export interface Hand {
  cards: Card[];
  score: number;
  addCard(card: Card): void;
  resetHand(): void;
}
