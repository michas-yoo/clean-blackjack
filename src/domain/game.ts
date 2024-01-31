export type Winner = 'player' | 'dealer';
export type GameState = 'game' | 'pending';

export interface Game {
  state: GameState;
  playerScore: number;
  dealerScore: number;
  setupHands(): void;
  playerMove(): void;
  dealerMove(): void;
  canDealerMove(): boolean;
  processWinner(): void;
  getWinner(): string;
  addWin(winner: Winner): void;
}
