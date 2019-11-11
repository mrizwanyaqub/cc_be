import Joi from "joi";

export const CreditCardSchema = {
    post: Joi.object().keys({
        id: Joi.string(),
        name: Joi.string().required().min(3).max(50),
        cardNumber: Joi.number().required().min(999999999),
        limit: Joi.number().required().min(0),
        balance: Joi.number()
    }),
};
