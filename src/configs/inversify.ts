import "reflect-metadata";
import { Container } from "inversify";
import { IController, CreditCardController } from "../controllers";
import { CreditCardService } from "../services";
import { Types } from "./types";

const container: Container = new Container();

// Controllers
container.bind<IController>(Types.Controller).to(CreditCardController);

// Services
container.bind<CreditCardService>(Types.CreditCardService).to(CreditCardService).inSingletonScope();

export { container };
