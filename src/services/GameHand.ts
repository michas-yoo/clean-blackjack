import { Hand } from '../domain/hand.ts';
import { Card } from '../domain/card.ts';

export class GameHand implements Hand {
  public cards: Card[] = [];
  public score: number = 0;

  addCard(card: Card): void {
    this.score = this.score + card.price;

    if (this.cards.find(c => c.value === 'A') && card.value === 'A') {
      this.score = 21;
    }

    this.cards.push(card);
  }

  resetHand(): void {
    this.cards = [];
    this.score = 0;
  }
}
