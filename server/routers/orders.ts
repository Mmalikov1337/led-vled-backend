import { Request, Response, NextFunction } from "express";
// import express from "express";
import * as express from "express";
import OrdersController from "./../controllers/ordersController";
import getAuthorizationMW from "./../middlewares/authorizationMW";
import { OrderStatus, IDBOrder, IDBItem } from "../types";
import Database from "../Database";

const ordersRouter = express.Router();

ordersRouter.get("/", getAuthorizationMW(), OrdersController.getOrders);
ordersRouter.get("/:id", getAuthorizationMW(), OrdersController.getOrders);
ordersRouter.post("/", getAuthorizationMW(), OrdersController.createOrder);

ordersRouter.put("/:id", getAuthorizationMW(), OrdersController.editOrders);
// ordersRouter.delete("/", getAuthorizationMW(), );
export default ordersRouter;
