<script setup lang="ts">
import { Card } from '../../domain/card.ts';

type TheHandProps = {
  cards: Card[];
};

const props = defineProps<TheHandProps>();
</script>

<template>
  <div class="hand">
    <div v-for="(card, i) in props.cards" :key="i" class="card">
      {{ card.suit }}{{ card.value }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.hand {
  display: flex;
}

.card {
  display: grid;
  place-items: center;
  padding: 10px 15px;
  background: white;
  color: black;
  border-radius: 5px;
  border: 2px solid black;

  &:not(:first-of-type) {
    margin-left: -5px;
  }
}

</style>
