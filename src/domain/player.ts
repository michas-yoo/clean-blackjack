import { Hand } from './hand.ts';
import { Deck } from './deck.ts';

interface CanMove {
  makeAMove(): void;
  checkIfCanMove(referenceScore?: number): boolean;
}

export interface Player extends Hand, CanMove {
  name: string;
  wins: number;
  deck: Deck;
}
