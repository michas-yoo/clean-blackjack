export type Winner = 'player' | 'dealer';
export type GameState = 'game' | 'pending';

export interface Game {
  state: GameState;
  playerWins: number;
  dealerWins: number;
  setupHands(): void;
  playerMove(): void;
  startDealerMoves(): void;
}

export const MAX_SCORE = 21;
