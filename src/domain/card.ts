export type Suit = '♠️' | '❤️' | '♣️' | '♦️';

export interface Card {
  suit: Suit;
  value: number | string;
  price: number;
}
