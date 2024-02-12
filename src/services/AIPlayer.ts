import { Player } from '../domain/player.ts';
import { GameHand } from './GameHand.ts';

const MAX_SAFE_SCORE = 19;

export class AIPlayer extends GameHand implements Player {
  makeAMove(): void {
    this.addCard(this.deck.pickCard());
  }

  checkIfCanMove(playerScore: number): boolean {
    if (this.score >= playerScore) {
      return false;
    }

    return this.score <= MAX_SAFE_SCORE;
  }
}
