import { Request, Response } from "express";
import authRouter from "./routers/auth";
import itemsRouter from "./routers/items";
import ordersRouter from "./routers/orders";

const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

const port = process.env.PORT || 3001;

export default function main() {
	try {
		app.use(express.json());
		app.use(express.urlencoded({ extended: true }));
		app.use(cors());
		app.use((req: Request, res: Response, next) => {
			console.log(
				req.path,
				req.method,
				{
					"req.params": req.params,
					"req.query": req.query,
					"req.body": req.body,
				},
				{ "req.headers.authorization": req.headers.authorization }
			);
			return next();
		});
		app.use("/api/orders", ordersRouter);
		app.use("/api/items", itemsRouter);
		app.use("/api/auth", authRouter);

		app.use(express.static(path.resolve(__dirname, "..", "dist")));

		app.get("*", (req: Request, res: Response) => {
			res.sendFile(path.resolve(__dirname, "..", "index.html"));
		});

		app.use((error, req, res, next) => {
			if (error) {
				console.log("Error status: ", error.status);
				console.log("Message: ", error.message);
				res.status(error.status);
				// Отправка ответа
				return res.json({
					status: error.status,
					message: error.message,
					stack: error.stack,
				});
			}
			res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
			res.header("Access-Control-Allow-Credentials", "true");
			res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE, PUT");
			res.header("Access-Control-Allow-Headers", "accept, content-type, if-modified-since");
			return next();
		});
		app.listen(port, () => {
			console.log(__dirname);
			console.log("Listening Port " + port);
		});
	} catch (e) {
		console.log("err", e.message);
	}
}
