import ItemsService from "./../services/itemsService";
import { NextFunction, Response, Request } from "express";
import { IDBImage } from "./../types";
import ClientError from "./../Errors/ClientError";
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
	async editItems(req: Request, res: Response, next: NextFunction) {
		try {
			const id: number | null = ~~req.params.id ?? null;
			const name: string | null = req.body.name ?? null;
			const price: string | null = req.body.price ?? null;
			const kal: string | null = req.body.kal ?? null;
			const size: string | null = req.body.kal ?? null;
			const rating: string | null = req.body.rating ?? null;
			const description: string | null = req.body.description ?? null;
			const image: IDBImage | null = req.body.image ?? null;
			const quantity: number | null = req.body.quantity ?? null;

			// if (decoded.id && decoded.iat) {
			await ItemsService.editItems(
				name,
				price,
				kal,
				size,
				rating,
				description,
				image,
				quantity,
				id
			);
			const total = 1;
			// res.setHeader("X-Total-Count", total.toString());
			// res.setHeader("Access-Control-Expose-Headers", "X-Total-Count");
			res.status(200);
			res.json({ id: id });
			// }
		} catch (e) {
			console.log(e);
			res.send(e);
		}
	}

	async deleteItems(req: Request, res: Response, next: NextFunction) {
		try {
			const id: number = ~~req.params.id;
			if (!id) {
				throw ClientError.badRequest("Wrong id");
			}
			const isDeleted = await ItemsService.deleteItems(id);
			if (!isDeleted) {
				console.log(`Item with id=${id} has not deleted.`);
			}
			res.send({ id: id });
		} catch (e) {}
	}

	async createItems(req: Request, res: Response, next: NextFunction) {
		try {
			const name: string | null = req.body.name ?? null;
			const price: string | null = req.body.price ?? null;
			const kal: string | null = req.body.kal ?? null;
			const size: string | null = req.body.kal ?? null;
			const rating: string | null = req.body.rating ?? null;
			const description: string | null = req.body.description ?? null;
			const image: IDBImage | null = req.body.image ?? null;
			const quantity: number | null = req.body.quantity ?? null;

			// const parsedImage = JSON
			console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>!!!",image, JSON.parse(JSON.stringify(image)));
			
			const insertId = await ItemsService.createItems(name, price, kal, size, rating, description, image, quantity);
			console.log("insertId",insertId);
			
			res.send({ id: insertId });
		} catch (e) {
			console.log(e);
			res.send(e);
		}
	}
}

export default new ItemsController();
