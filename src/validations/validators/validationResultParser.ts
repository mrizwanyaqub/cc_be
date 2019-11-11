import { ValidationResult } from "Joi";
import { ICreditCard } from "../../entities";

export const validationResultParser = (validationResult: ValidationResult<ICreditCard>): string[] => {
    const { error } = validationResult;
    const valid = error == null;
    if (valid)
        return [];

    return error.details.map(e => e.message);
};
