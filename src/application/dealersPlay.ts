import { Game } from '../domain/game.ts';

export function dealersPlay(game: Game): void {
  alert('Ok, dealer moves!');
  game.state = 'pending';

  const gameInterval = setInterval(() => {
    if (!game.canDealerMove()) {
      clearInterval(gameInterval);
    }

    game.dealerMove();
  }, 1000);
}
