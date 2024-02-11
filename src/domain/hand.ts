import { Card } from './card.ts';
import { Deck } from './deck.ts';

export interface Hand {
  name: string;
  deck: Deck;
  cards: Card[];
  score: number;
  wins: number;
  dealCards(): void;
  addCard(card: Card): void;
}
