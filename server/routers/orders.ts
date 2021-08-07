import { Request, Response, NextFunction } from "express";
// import express from "express";
import * as express from "express";
import ordersController from "./../controllers/ordersController";
import getAuthorizationMW from "./../middlewares/authorizationMW";
import { OrderStatus, IDBOrder, IDBItem } from "../types";
import Database from "../Database";

const ordersRouter = express.Router();

ordersRouter.get("/", getAuthorizationMW(), ordersController.getOrders);
ordersRouter.get("/:id", getAuthorizationMW(), ordersController.getOrders);
ordersRouter.post("/", getAuthorizationMW(), ordersController.createOrder);

// ordersRouter.put("/", getAuthorizationMW(), );
// ordersRouter.delete("/", getAuthorizationMW(), );
export default ordersRouter;
