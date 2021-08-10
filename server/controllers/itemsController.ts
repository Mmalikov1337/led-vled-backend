import ItemsService from "./../services/itemsService";
import { NextFunction, Response, Request } from "express";
class ItemsController {
	async getItems(req: Request, res: Response, next: NextFunction) {
		try {
			const { total, items } = await ItemsService.getItems(~~req.params.id ?? null);

			res.setHeader("X-Total-Count", total.toString());
			res.setHeader("Access-Control-Expose-Headers", "X-Total-Count");
			if (req.params.id)
				//Если только один предмет, то полученный массив надо развернуть
				return res.send(...items);
			else return res.send(items);
		} catch (e) {
			next(e);
		}
	}
}

export default new ItemsController();
