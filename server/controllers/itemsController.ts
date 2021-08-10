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
			const id: number = ~~req.params.id;
			const name: string = req.body.name;
			const price: string = req.body.price;
			const kal: string = req.body.kal;
			const size: string = req.body.kal;
			const rating: string = req.body.rating;
			const description: string = req.body.description;
			const image: IDBImage = req.body.image;
			const quantity: number = req.body.quantity;

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
}

export default new ItemsController();
