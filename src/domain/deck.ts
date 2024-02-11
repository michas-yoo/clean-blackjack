import { Card } from './card.ts';

export interface Deck {
  cards: Card[];
  hasCards(): boolean;
  pickCard(): Card;
  createDeck(): void;
  reCreateDeck(): void
}
