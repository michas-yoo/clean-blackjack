import { Hand } from './hand.ts';
import { Deck } from './deck.ts';

interface Movable {
  makeAMove(): void;
}

interface HasCards {
  deck: Deck;
}

export interface Player extends Movable, Hand, HasCards {
  checkIfCanMove(): boolean;
}

export interface Dealer extends Movable, Hand, HasCards {
  checkIfCanMove(playersScore: number): boolean;
}
