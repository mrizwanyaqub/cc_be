import { Application, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IRoutes } from "./IRoutes";
import { CreditCardController } from "../controllers";
import { sendDataResponse, sendRecordCreatedResponse } from "../utils/response";
import { Types } from "../configs/types";

@injectable()
export class CreditCardRoutes implements IRoutes {

    @inject(Types.Controller)
    private creditCardController: CreditCardController;

    public register(app: Application): void {

        app.route("/creditcards/:id").get((req: Request, res: Response) => {
            sendDataResponse(res, this.creditCardController.getCreditCardById(req.params.id));
        });

        app.route("/creditcards").get((req: Request, res: Response) => {
            sendDataResponse(res, this.creditCardController.getAllCreditCards());
        });

        app.route("/creditcards").post( (req: Request, res: Response) => {
            sendRecordCreatedResponse(res, this.creditCardController.addCreditCard(req.body));
        });
    }
}

export default CreditCardRoutes;
