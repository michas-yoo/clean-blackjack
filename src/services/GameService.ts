import { Deck } from '../domain/deck.ts';
import { Player } from '../domain/player.ts';
import { ModalService } from './ModalService.ts';
import { Game, GameState, MAX_SCORE } from '../domain/game.ts';

export class GameService implements Game {
  public state: GameState;
  public canRestart: boolean;
  private readonly player: Player;
  private readonly dealer: Player;
  private readonly enemies: Player[];
  private readonly deck: Deck;

  constructor(deck: Deck, player: Player, dealer: Player, enemies: Player[]) {
    this.deck = deck;
    this.state = 'game';
    this.player = player;
    this.dealer = dealer;
    this.enemies = enemies;
    this.canRestart = false;

    this.setupHands();
  }

  setupHands(): void {
    this.state = 'game';
    this.canRestart = false;

    if (this.deck.cards.length <= 4) {
      this.deck.reCreateDeck();
    }

    this.player.dealCards();
    this.dealer.dealCards();
    this.enemies.forEach((enemy) => enemy.dealCards());
  }

  playerMove(): void {
    if (!this.checkIfEnoughCards()) {
      ModalService.alert('Колода закончилась, никто не победил!');
      this.setupHands();
      return;
    }

    this.player.makeAMove();

    if (!this.player.checkIfCanMove()) {
      setTimeout(() => {
        ModalService.alert('Перебор!');

        if (this.enemies.length) {
          this.startEnemiesMoves();
        } else {
          this.startDealerMoves();
        }
      }, 500);
      return;
    }
  }

  startEnemiesMoves(): void {
    this.state = 'pending';

    if (!this.checkIfEnoughCards()) {
      ModalService.alert('Колода закончилась, никто не победил!');
      this.setupHands();
      return;
    }

    if (!this.enemies.length) {
      ModalService.alert('Ход дилера');
      this.startDealerMoves();
      return;
    }

    let currentEnemy: number = 0;

    const enemyMovingInterval = setInterval(() => {
      const enemy = this.enemies[currentEnemy];

      if (!enemy) {
        clearInterval(enemyMovingInterval);
        ModalService.alert('Все противники сделали ход.');
        this.startDealerMoves();
        return;
      }

      if (enemy.checkIfCanMove(this.player.score)) {
        enemy.makeAMove();
        return;
      }

      ModalService.alert(`${enemy.name} больше не ходит`);
      currentEnemy++;
    }, 1000);
  }

  startDealerMoves(): void {
    if (!this.checkIfEnoughCards()) {
      ModalService.alert('Колода закончилась, никто не победил!');
      this.setupHands();
      return;
    }

    const gameInterval = setInterval(() => {
      if (!this.dealer.checkIfCanMove(this.player.score)) {
        clearInterval(gameInterval);
        ModalService.alert('Дилер больше не ходит!');
        this.processWinner();
        return;
      }

      this.dealer.makeAMove();
    }, 1000);
  }

  private checkIfEnoughCards(): boolean {
    return this.deck.hasCards();
  }

  private determineWinner(): Player {
    const players: Player[] = [
      ...this.enemies,
      this.player,
      this.dealer,
    ];
    let currentWinner: Player | null = null;

    players.forEach((possibleWinner: Player): void => {
      if (possibleWinner.score > MAX_SCORE) return;
      if (
        !currentWinner ||
        currentWinner.score <= possibleWinner.score
      ) {
        currentWinner = possibleWinner;
      }
    });

    if (!currentWinner) {
      ModalService.alert("Нет победителей, выиграл дилер");
      return this.dealer;
    }

    return currentWinner;
  }

  private processWinner(): void {
    this.state = 'pending';
    this.canRestart = true;
    const winner: Player = this.determineWinner();
    this.addWin(winner);
  }

  private addWin(winner: Player): void {
    ModalService.alert(`${winner.name} победил!`);
    winner.wins++;
  }
}
