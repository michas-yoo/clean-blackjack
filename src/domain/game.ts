export type Winner = 'player' | 'dealer';
export type GameState = 'game' | 'pending';

export interface Game {
  state: GameState;
  setupHands(): void;
  playerMove(): void;
  startEnemiesMoves(): void;
  startDealerMoves(): void;
}

export const MAX_SCORE = 21;
