import { Hand } from '../domain/hand.ts';
import { Card } from '../domain/card.ts';
import { Deck } from '../domain/deck.ts';

export class GameHand implements Hand {
  public deck: Deck;
  public cards: Card[] = [];
  public score: number = 0;

  constructor(deck: Deck) {
    this.deck = deck;
  }

  dealCards(): void {
    this.resetHand();
    this.addCard(this.deck.pickCard());
  }

  addCard(card: Card): void {
    this.score = this.score + card.price;

    if (this.cards.find(c => c.value === 'A') && card.value === 'A') {
      this.score = 21;
    }

    this.cards.push(card);
  }

  private resetHand(): void {
    this.cards = [];
    this.score = 0;
  }
}
