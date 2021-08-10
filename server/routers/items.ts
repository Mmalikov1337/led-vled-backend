import * as express from "express";
import getAuthorizationMW from "./../middlewares/authorizationMW";
import ItemsContrtoller from "./../controllers/itemsController";
const itemsRouter = express.Router();

itemsRouter.get("/", getAuthorizationMW(), ItemsContrtoller.getItems);

export default itemsRouter;
