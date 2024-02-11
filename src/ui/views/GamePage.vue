<script setup lang="ts">
import { ref } from 'vue';
import { GameDeck } from '../../services/GameDeck.ts';
import { GameService } from '../../services/GameService.ts';
import { MainPlayer } from '../../services/MainPlayer.ts';
import { GameDealer } from '../../services/GameDealer.ts';
import { AI } from '../../domain/player.ts';
import { AIPlayer } from '../../services/AIPlayer.ts';
import TheHand from '../components/TheHand.vue';
import TheScoreBoard from '../components/TheScoreBoard.vue';

const aiPlayersAmount = prompt('Сколько будет соперников?', '0');

const deck = ref(new GameDeck());
const player = ref(new MainPlayer(deck.value, 'Игрок'));
const dealer = ref(new GameDealer(deck.value, 'Дилер'));
const enemies = ref<AI[]>([]);

for (let i = 0; i < Number(aiPlayersAmount); i++) {
  enemies.value.push(new AIPlayer(deck.value, `ИИ #${i + 1}`));
}

const game = ref(new GameService(deck.value, player.value, dealer.value, enemies.value));
</script>

<template>
  <article class="field">
    <div class="dealer">
      <p>У дилера в руке: {{ dealer.score }}</p>
      <TheHand :cards="dealer.cards" />
    </div>

    <TheScoreBoard
      :dealer="dealer"
      :enemies="enemies"
      :player="player"
    />

    <div class="deck-container">
      <div class="deck">{{ deck.cards.length }}</div>
    </div>

    <div class="enemies-container">
      <div v-for="(enemy, i) in enemies" :key="i">
        {{ enemy.name }}
        <span v-if="enemy.cards.length">В руке: {{ enemy.score }}</span>
        <TheHand :cards="enemy.cards" />
      </div>
    </div>

    <TheHand :cards="player.cards" />

    <div class="currentScore">
      {{ player.score }}
    </div>

    <div class="controls">
      <button v-if="game.state === 'game'" @click="game.playerMove()">
        Ещё
      </button>
      <button v-if="game.state === 'game'" @click="game.startEnemiesMoves()">
        Пас
      </button>

      <button
        v-if="game.state === 'pending'"
        @click="game.setupHands()"
        :disabled="!game.canRestart"
      >
        Заново
      </button>
    </div>
  </article>
</template>

<style scoped lang="scss">
.field {
  width: 800px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 150px 1fr 100px;
  grid-gap: 50px 10px;
  padding: 20px;
  background: darkgreen;
}

.dealer {
  grid-column-start: 2;
}

.currentScore, .deck {
  border-radius: 5px;
  border: 2px solid black;
}

.currentScore, .controls {
  display: grid;
  place-items: center;
}

.deck-container {
  display: flex;
  align-items: center;
  grid-column: span 2;
}

.deck {
  position: relative;
  width: 120px;
  height: 50px;
  background: darkred;
  color: white;
  display: grid;
  place-items: center;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: -5px;
    width: 100%;
    height: 95%;
    background: darkred;
    border: 2px solid black;
    z-index: -1;
  }
}

.dealer {
  flex-direction: column;
}

.controls {
  grid-gap: 10px;
}
</style>
