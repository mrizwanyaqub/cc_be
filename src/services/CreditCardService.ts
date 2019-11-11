import { injectable } from "inversify";
import uuid from "uuid/v1";
import { ICreditCard } from "../entities";
import { validateCreditCardPost } from "../validations/validators";
import {NotFound, Conflict, BadRequest} from "../utils/exceptions";


/*
    this is the service to retrieve data from data store, database or cache,
    for now I'm using in memory storage for time constraint
 */

@injectable()
export class CreditCardService {

    private ccStorage: ICreditCard[] = [];

    public getCreditCards(): ICreditCard[] {
        return this.ccStorage.map(cc => ({...cc})); //returning new array so original array cannot be modified directly.
    }

    public getCreditCard(id: string): ICreditCard {
        if (!id)
            throw new BadRequest(JSON.stringify(["Missing field {id}"]));

        let result: ICreditCard = this.ccStorage.find(creditCard => creditCard.id === id);
        if (!result)
            throw new NotFound(JSON.stringify([`No credit card found for the id:${id}`]));

        result = {
            ...result // returning a new object to avoid direct changes to the object
        };
        return  result;
    }

    public addCreditCard(creditCard: ICreditCard): ICreditCard {
        const errors = validateCreditCardPost(creditCard); //checking it again in service, possible the addCreditCard could be called from inside our system as part of some business logic
        if (errors.length)
            throw new BadRequest(JSON.stringify(errors));

        creditCard.cardNumber = parseInt(creditCard.cardNumber.toString());
        const existingCard: ICreditCard = this.ccStorage.find(cc => cc.cardNumber === creditCard.cardNumber);
        if (existingCard)
            throw new Conflict(JSON.stringify([`There is already a credit card with cardNumber:${existingCard.cardNumber}`]));

        creditCard.id = uuid();
        creditCard.balance = 0;
        this.ccStorage.push(creditCard);
        return {
            ...creditCard // returning a new object to avoid direct changes to the object
        };
    }
}
