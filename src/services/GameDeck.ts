import { Deck } from '../domain/deck.ts';
import { Card, Suit } from '../domain/card.ts';

export class GameDeck implements Deck {
  public cards: Card[] = [];

  constructor() {
    this.createDeck();
  }

  clearDeck(): void {
    this.cards = [];
  }

  createDeck(): void {
    const suits: Suit[] = ['♠️', '❤️', '♣️', '♦️'];
    const possibleValues: (number | string)[]= [
      2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'K', 'Q', 'A'
    ];

    for (const suit of suits) {
      for (const card of possibleValues) {
        this.cards.push({
          suit,
          value: card,
          price: typeof card === 'number' ? card : 10,
        });
      }
    }
  }

  reCreateDeck(): void {
    this.clearDeck();
    this.createDeck();
  }

  pickCard(): Card {
    const id: number = Math.floor(Math.random() * this.cards.length);
    const theCard: Card = this.cards[id];
    this.removeCardFromDeck(id);

    return theCard;
  }

  removeCardFromDeck(id: number): void {
    this.cards.splice(id, 1);
  }
}
