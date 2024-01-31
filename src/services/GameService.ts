import { Deck } from '../domain/deck.ts';
import { Game, GameState, MAX_SCORE, Winner } from '../domain/game.ts';
import { Dealer, Player } from '../domain/player.ts';

export class GameService implements Game {
  public state: GameState;
  private player: Player;
  private dealer: Dealer;
  public playerWins: number = 0;
  public dealerWins: number = 0;
  private readonly deck: Deck;

  constructor(deck: Deck, player: Player, dealer: Dealer) {
    this.deck = deck;
    this.state = 'game';
    this.player = player;
    this.dealer = dealer;

    this.setupHands();
  }

  setupHands(): void {
    this.state = 'game';
    if (this.deck.cards.length <= 4) {
      this.deck.reCreateDeck();
    }

    this.player.dealCards();
    this.dealer.dealCards();
  }

  playerMove(): void {
    this.player.makeAMove();

    if (!this.player.checkIfCanMove()) {
      setTimeout(() => {
        alert('Can\'t move!');
        this.processWinner();
      }, 500);
      return;
    }
  }

  startDealerMoves(): void {
    this.state = 'pending';

    const gameInterval = setInterval(() => {
      if (!this.dealer.checkIfCanMove(this.player.score)) {
        clearInterval(gameInterval);
        alert('Dealer cant move!');
        this.processWinner();
        return
      }

      this.dealer.makeAMove();
    }, 1000)
  }

  private determineWinner(playerScore: number, dealerScore: number): Winner {
    if (playerScore > MAX_SCORE) return 'dealer';
    if (dealerScore > MAX_SCORE) return 'player';
    if (playerScore > dealerScore) return 'player';

    // dealer wins on a draw
    return 'dealer';
  }

  private processWinner(): void {
    this.state = 'pending';
    const winner: Winner = this.determineWinner(this.player.score, this.dealer.score);
    this.addWin(winner);
  }

  private addWin(winner: Winner): void {
    this[`${winner}Wins`] += 1;
    alert(`${winner} won!`);
  }
}
