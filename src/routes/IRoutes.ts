import { Application } from "express";

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IRoutes {
    register(app: Application): void;
}
