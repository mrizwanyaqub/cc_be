import Joi from "joi";
import luhn from "luhn";
import {ICreditCard} from "../../entities";
import { CreditCardSchema } from "../schemas";
import { validationResultParser } from "./validationResultParser";


export const validateCreditCardPost = (body: ICreditCard) => {
    const errors: string[] = validationResultParser(Joi.validate(body, CreditCardSchema.post));

    if (!luhn.validate(body.cardNumber))
        errors.push("Invalid field {cardNumber}");

    return errors;
};
