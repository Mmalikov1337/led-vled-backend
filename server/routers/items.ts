import * as express from "express";
import getAuthorizationMW from "./../middlewares/authorizationMW";
import ItemsContrtoller from "./../controllers/itemsController";
const itemsRouter = express.Router();

itemsRouter.get("/", getAuthorizationMW(), ItemsContrtoller.getItems);
itemsRouter.get("/:id", getAuthorizationMW(), ItemsContrtoller.getItems);
itemsRouter.put("/:id", getAuthorizationMW(), ItemsContrtoller.editItems);
itemsRouter.delete("/:id", getAuthorizationMW(), ItemsContrtoller.deleteItems);

export default itemsRouter;
