import { ICreditCard, CreditCard } from "../../src/entities";

export const creditCardNumbers = [
    4111111111111111,
    5500000000000004,
    340000000000009,
    30000000000004,
    6011000000000004,
    201400000000009,
    3088000000000009
];

export const getDefaultCreditCards = (size: number): ICreditCard[] => {
  const cards = [];
  for (let i = 0; i < size; i++) {
    cards.push(new CreditCard(i.toString(), `some name ${i}`, creditCardNumbers[i], 100, 0));
  }
  return cards;
};

export const createEmptyCreditCard = (): CreditCard => {
    return new CreditCard(null, null, null, null, null);
};

export const newCardWithName = (name: string): ICreditCard => {
  return new CreditCard(null, name, null, null, null);
};

export const newCardWithNumber = (cardNumber: number): ICreditCard => {
  return new CreditCard(null, null, cardNumber, null, null);
};
