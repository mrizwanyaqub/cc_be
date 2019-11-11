import { Application } from "express";

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IController {
    register(app: Application): void;
}
