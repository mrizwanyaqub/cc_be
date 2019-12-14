import { inject, injectable } from "inversify";
import { Types } from "../configs/types";
import { CreditCardService } from "../services";
import { BadRequest } from "../utils/exceptions";
import { validateCreditCardPost } from "../validations/validators";
import {ICreditCard} from "../entities";

@injectable()
export class CreditCardController {

    @inject(Types.CreditCardService)
    private creditCardService: CreditCardService;

    public getCreditCardById = (id: string) => {
        return this.creditCardService.getCreditCard(id);
    };

    public getAllCreditCards = () => {
        return this.creditCardService.getCreditCards();
    };

    public addCreditCard = (creditCard: ICreditCard) => {
        const errors = validateCreditCardPost(creditCard);
        if (errors.length)
            throw new BadRequest(JSON.stringify(errors));

        return this.creditCardService.addCreditCard(creditCard);
    };
}

export default CreditCardController;
