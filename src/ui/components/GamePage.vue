<script setup lang="ts">
import { ref } from 'vue';
import { GameDeck } from '../../services/GameDeck.ts';
import { GameHand } from '../../services/GameHand.ts';
import { GameService } from '../../services/GameService.ts';
import { dealersPlay } from '../../application/dealersPlay.ts';

const deck = ref(new GameDeck());
const playersHand = ref(new GameHand());
const dealersHand = ref(new GameHand());
const game = ref(new GameService(deck.value, dealersHand.value, playersHand.value));
</script>

<template>
  <article class="field">
    <div class="hand dealer">
      <div v-for="(card, i) in dealersHand.cards" :key="i" class="card">
        {{ card.suit }}{{ card.value }}
      </div>
    </div>
    <div class="score">
      Счёт: {{ game.playerScore }} : {{ game.dealerScore }}
      <br>
      <p>У дилера: {{ dealersHand.score }}</p>
    </div>
    <div class="deck-container">
      <div class="deck">{{ deck.cards.length }}</div>
    </div>
    <div class="hand">
      <div v-for="(card, i) in playersHand.cards" :key="i" class="card">
        {{ card.suit }}{{ card.value }}
      </div>
    </div>
    <div class="currentScore">
      {{ playersHand.score }}
    </div>
    <div class="controls">
      <button v-if="game.state === 'game'" @click="game.playerMove()">More</button>
      <button v-if="game.state === 'game'" @click="dealersPlay(game)">Pass</button>

      <button v-if="game.state === 'pending'" @click="game.setupHands()">Restart</button>
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
