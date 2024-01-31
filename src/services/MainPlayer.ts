import { Player } from '../domain/player.ts';
import { GameHand } from './GameHand.ts';
import { MAX_SCORE } from '../domain/game.ts';

export class MainPlayer extends GameHand implements Player {
  dealCards() {
    super.dealCards();
    // player gets two cards
    this.addCard(this.deck.pickCard());
  }

  makeAMove(): void {
    this.addCard(this.deck.pickCard());
  }

  checkIfCanMove(): boolean {
    return this.score <= MAX_SCORE;
  }
}
