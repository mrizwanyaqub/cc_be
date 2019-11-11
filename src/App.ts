import express, { Application, Request, Response, NextFunction } from "express";
import errorHandler from "errorhandler";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";

import { IController } from "./controllers";

import { container } from "./configs/inversify";
import { Types } from "./configs/types";
import { ENVIRONMENT } from "./utils/constants";
import { logger } from "./utils/logger";

import { NotFound, BadRequest, Conflict } from "./utils/exceptions";
import {
    sendNotFoundResponse,
    sendBadRequestResponse,
    sendConflictResponse,
    sendInternalErrorResponse
} from "./utils/response";

export default class App {
    private init() {
        const app: Application = express();
        app.set("port", process.env.PORT || 3000);
        app.use(errorHandler());
        app.use(compression()); // The middleware will attempt to compress response bodies for all request
        app.use(helmet()); // Helps you secure your Express apps by setting various HTTP headers
        app.use(morgan(ENVIRONMENT === "production" ? "combined" : "dev"));
        app.use(cors());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        const controllers: IController[] = container.getAll<IController>(Types.Controller);
        controllers.forEach(controller => controller.register(app));

        app.use("*", (req: Request, res: Response) => {
            sendNotFoundResponse(res, "Invalid api called");
        });

        app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            if (err instanceof NotFound)
                return sendNotFoundResponse(res, err.message);

            if (err instanceof BadRequest)
                return sendBadRequestResponse(res, err.message);

            if (err instanceof Conflict)
                return sendConflictResponse(res, err.message);

            logger.error(err.stack);
            sendInternalErrorResponse(res);
        });
        return app;
    }

    public start() {
        const app = this.init();
        app.listen(app.get("port"), async () => {
            console.log(`Service running at port ${app.get("port")} in ${app.get("env")} mode`);
            console.log("Date: ", new Date());
        });
    }
}
