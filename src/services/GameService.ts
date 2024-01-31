import { Deck } from '../domain/deck.ts';
import { Hand } from '../domain/hand.ts';
import { Game, GameState, Winner } from '../domain/game.ts';
import { Card } from '../domain/card.ts';

export class GameService implements Game {
  public state: GameState;
  public playerScore: number = 0;
  public dealerScore: number = 0;
  private readonly deck: Deck;
  private readonly playersHand: Hand;
  private readonly dealersHand: Hand;

  constructor(deck: Deck, dealersHand: Hand, playersHand: Hand) {
    this.deck = deck;
    this.dealersHand = dealersHand;
    this.playersHand = playersHand;
    this.state = 'game';

    this.setupHands();
  }

  setupHands(): void {
    this.state = 'game';
    if (this.deck.cards.length <= 4) {
      this.deck.reCreateDeck();
    }

    this.dealersHand.resetHand();
    this.playersHand.resetHand();

    this.dealersHand.addCard(this.deck.pickCard());

    this.playersHand.addCard(this.deck.pickCard());
    this.playersHand.addCard(this.deck.pickCard());
  }

  playerMove(): void {
    const card: Card = this.deck.pickCard();
    this.playersHand.addCard(card);

    if (this.playersHand.score > 21) {
      setTimeout(() => {
        alert('Too much!');
        this.processWinner();
      }, 1000);
    }
  }

  canDealerMove(): boolean {
    return this.dealersHand.score < 16
      || (
        this.playersHand.score <= 21
        && this.dealersHand.score < this.playersHand.score
        && this.dealersHand.score < 16
      );
  }

  dealerMove(): void {
    if (!this.canDealerMove()) {
      alert('Dealer cant move!');
      this.processWinner();
      return;
    }

    const card: Card = this.deck.pickCard();
    this.dealersHand.addCard(card);
  }

  getWinner(): string {
    const playersHandScore: number = this.playersHand.score;
    const dealersHandScore: number = this.dealersHand.score;

    if (
      (playersHandScore > 21 && dealersHandScore <= 21)
      || (playersHandScore < 21 && dealersHandScore > playersHandScore && dealersHandScore <= 21)
    ) {
      return 'dealer';
    }

    if (
      (dealersHandScore > 21 && playersHandScore <= 21)
      || (dealersHandScore < 21 && playersHandScore > dealersHandScore && dealersHandScore <= 21)) {
      return 'player';
    }

    return 'draw!';
  }

  processWinner(): void {
    const winner: string = this.getWinner();
    if (winner !== 'draw') {
      this.addWin(winner as Winner);
    }
  }

  addWin(winner: Winner): void {
    this.state = 'pending';
    this[`${winner}Score`] += 1;
    alert(`${winner} won!`);
  }
}
