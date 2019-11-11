// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface ICreditCard {
    id: string;
    name: string;
    cardNumber: number;
    limit: number;
    balance: number;
}

export class CreditCard implements ICreditCard {
    id: string;
    name: string;
    cardNumber: number;
    limit: number;
    balance: number;

    constructor(id: string, name: string, cardNumber: number, limit: number, balance: number) {
        this.id = id;
        this.name = name;
        this.cardNumber = cardNumber;
        this.limit = limit;
        this.balance = balance;
    }
}
