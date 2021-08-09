import { NextFunction, Response, Request } from "express";
import * as jwt from "jsonwebtoken";
import { tokenKey } from "./../config";
import ClientError from "./../Errors/ClientError";
interface RequestExtended extends Request {
	tokenData: any;
}
const getAuthorizationMW = () => {
	return (req: RequestExtended, res: Response, next: NextFunction) => {
		try {
			const authorization = (req as Request).query._token as string;
			if (!authorization) {
				ClientError.notAuthorizated("Wrong token.");
			}
			const decoded = jwt.verify(authorization, tokenKey);
			if (!decoded) return;
			req.tokenData = decoded;
			return next();
		} catch (e) {
			next(e);
		}
	};
};

export default getAuthorizationMW;
