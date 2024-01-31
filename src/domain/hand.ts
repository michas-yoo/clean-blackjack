import { Card } from './card.ts';
import { Deck } from './deck.ts';

export interface Hand {
  deck: Deck;
  cards: Card[];
  score: number;
  dealCards(): void;
  addCard(card: Card): void;
}
