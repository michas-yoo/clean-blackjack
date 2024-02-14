<script setup lang="ts">
import { Player } from '../../domain/player.ts';

type TheScoreBoardProps = {
  player: Player;
  dealer: Player;
  enemies: Player[];
};

const props = defineProps<TheScoreBoardProps>();
</script>

<template>
  <div class="score">
    Счёт:
    <div>
      <p>Игрок: {{ props.player.wins }}</p>
      <p>Дилер: {{ props.dealer.wins }}</p>
      <p v-for="enemy in props.enemies">
        {{ enemy.name }}: {{ enemy.wins }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.score {
  display: flex;
  flex-wrap: wrap;
}

.score div {
  display: flex;
  flex-direction: column;
}

.score p {
  margin: 0;
}
</style>
