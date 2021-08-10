"use strict";
exports.__esModule = true;
var express = require("express");
var authorizationMW_1 = require("./../middlewares/authorizationMW");
var itemsController_1 = require("./../controllers/itemsController");
var itemsRouter = express.Router();
itemsRouter.get("/", authorizationMW_1["default"](), itemsController_1["default"].getItems);
exports["default"] = itemsRouter;
