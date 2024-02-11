import { AI } from '../domain/player.ts';
import { GameHand } from './GameHand.ts';

const SOFT_CAP = 17;

export class GameDealer extends GameHand implements AI {
  makeAMove(): void {
    this.addCard(this.deck.pickCard());
  }

  checkIfCanMove(playersScore: number): boolean {
    if (this.score >= SOFT_CAP) {
      return false;
    }

    return this.score < playersScore;
  }
}
