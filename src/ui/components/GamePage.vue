<script setup lang="ts">
import { ref } from 'vue';
import { GameDeck } from '../../services/GameDeck.ts';
import { GameService } from '../../services/GameService.ts';
import { MainPlayer } from '../../services/MainPlayer.ts';
import { GameDealer } from '../../services/GameDealer.ts';

const deck = ref(new GameDeck());
const player = ref(new MainPlayer(deck.value));
const dealer = ref(new GameDealer(deck.value));
const game = ref(new GameService(deck.value, player.value, dealer.value));
</script>

<template>
  <article class="field">
    <div class="hand dealer">
      <div v-for="(card, i) in dealer.cards" :key="i" class="card">
        {{ card.suit }}{{ card.value }}
      </div>
    </div>
    <div class="score">
      Счёт: {{ game.playerWins }} : {{ game.dealerWins }}
      <br>
      <p>У дилера: {{ dealer.score }}</p>
    </div>
    <div class="deck-container">
      <div class="deck">{{ deck.cards.length }}</div>
    </div>
    <div class="hand">
      <div v-for="(card, i) in player.cards" :key="i" class="card">
        {{ card.suit }}{{ card.value }}
      </div>
    </div>
    <div class="currentScore">
      {{ player.score }}
    </div>
    <div class="controls">
      <button
        v-if="game.state === 'game'"
        @click="game.playerMove()"
      >
        More
      </button>
      <button
        v-if="game.state === 'game'"
        @click="game.startDealerMoves()"
      >
        Pass
      </button>

      <button
        v-if="game.state === 'pending'"
        @click="game.setupHands()"
      >
        Restart
      </button>
    </div>
  </article>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.field {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 50px 1fr;
  grid-gap: 10px;
  padding: 20px;
  background: darkgreen;
}

.dealer {
  grid-column-start: 2;
}

.card {
  background: white;
  color: black;
}

.card:not(:first-of-type) {
  margin-left: -20px;
}

.deck-container {
  grid-column: span 3;
}

.deck {
  width: 30%;
  height: 100%;
  background: darkred;
  color: white;
  display: grid;
  place-items: center;
}

.hand {
  display: flex;
}

.card, .currentScore, .deck {
  border-radius: 5px;
  border: 2px solid black;
}

.card, .currentScore, .controls {
  display: grid;
  place-items: center;
}

.controls {
  grid-gap: 10px;
}
</style>
