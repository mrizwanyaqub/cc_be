import "reflect-metadata";
import { Container } from "inversify";
import { IRoutes, CreditCardRoutes } from "../routes";
import { CreditCardController } from "../controllers";
import { CreditCardService } from "../services";
import { Types } from "./types";

const container: Container = new Container();

// Routes
container.bind<IRoutes>(Types.Routes).to(CreditCardRoutes);

// Controllers
container.bind<CreditCardController>(Types.Controller).to(CreditCardController);

// Services
container.bind<CreditCardService>(Types.CreditCardService).to(CreditCardService).inSingletonScope();

export { container };
