import { Application, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IController } from "./IController";
import { CreditCardService } from "../services";
import { sendDataResponse, sendRecordCreatedResponse } from "../utils/response";
import { Types } from "../configs/types";
import { BadRequest } from "../utils/exceptions";
import { validateCreditCardPost } from "../validations/validators";

@injectable()
export class CreditCardController implements IController {

    @inject(Types.CreditCardService)
    private creditCardService: CreditCardService;

    public register(app: Application): void {

        app.route("/creditcards/:id").get((req: Request, res: Response) => {
            sendDataResponse(res, this.creditCardService.getCreditCard(req.params.id));
        });

        app.route("/creditcards").get((req: Request, res: Response) => {
            sendDataResponse(res, this.creditCardService.getCreditCards());
        });

        app.route("/creditcards").post( (req: Request, res: Response) => {
            const body = req.body;
            const errors = validateCreditCardPost(body);
            if (errors.length)
                throw new BadRequest(JSON.stringify(errors));

            sendRecordCreatedResponse(res, this.creditCardService.addCreditCard(req.body));
        });
    }
}

export default CreditCardController;
