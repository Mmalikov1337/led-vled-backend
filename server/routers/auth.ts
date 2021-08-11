import * as express from "express";
import Database from "./../Database";
import { NextFunction, Response, Request } from "express";
import * as jwt from "jsonwebtoken";
import {compare} from "bcrypt";
import { tokenKey } from "./../config";

const authRouter = express.Router();

authRouter.post("/authenticate", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const rows = await Database.getAdminByName(req.body.username);

		const string = JSON.stringify(rows);
		let adminDB = JSON.parse(string)[0];
		const jwtToken = jwt.sign({ id: adminDB.id }, tokenKey, { expiresIn: "4h" });

		if (adminDB) {
			const access = await compare(req.body.password, adminDB.password);
            
			if (req.body.username === adminDB.username && access) {
				return res.status(200).json({
					id: adminDB.id,
					login: adminDB.username,
					token: jwtToken,
				});
			}
		}

		return res.status(401).json({ message: "Неправильный логин / пароль" });
	} catch (e) {
		console.log(e);
		res.send(e);
	}
});
authRouter.post("/checkAuth", async (req: Request, res: Response) => {
	try {
		jwt.verify(req.body.token, tokenKey, (err, decoded) => {
            console.log("req.body.token",req.body.token);
            
			if (err) {
				console.log("Not authorizated", err.message);

				return res.status(300).json({ message: "Not authorizated" });
			} else {
				console.log("OKK");

				return res.status(200).json({ message: "OK" });
			}
		});
	} catch (e) {
		console.log(e);
	}
});

export default authRouter;
