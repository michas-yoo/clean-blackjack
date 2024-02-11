import { AI } from '../domain/player.ts';
import { GameHand } from './GameHand.ts';
import { MAX_SCORE } from '../domain/game.ts';

const SOFT_CAP = 17;

export class GameDealer extends GameHand implements AI {
  makeAMove(): void {
    this.addCard(this.deck.pickCard());
  }

  checkIfCanMove(playersScore: number): boolean {
    return this.score < SOFT_CAP
      || (
        this.score < SOFT_CAP
        && playersScore <= MAX_SCORE
        && this.score < playersScore
      );
  }
}
