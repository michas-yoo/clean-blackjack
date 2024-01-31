import { Card } from './card.ts';

export interface Deck {
  cards: Card[];
  pickCard(): Card;
  createDeck(): void;
  reCreateDeck(): void
}
