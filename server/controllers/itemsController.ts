//@ts-nocheck
import { NextFunction, Response, Request } from "express";
class ItemsController {
	async getItems(req: Request, res: Response, next: NextFunction) {// "/"
        try {
			const [rows] = await pool.execute(`SELECT * FROM items`);
			const string = JSON.stringify(rows);
			let items: IDBItem[] = JSON.parse(string);

			if (req.query.name) {
				items = items.filter((e) =>
					e.name.toLowerCase().includes((req.query.name as string).toLowerCase())
				);
			}

			const total = items.length;
			res.set("X-Total-Count", total.toString());
			res.header("Access-Control-Expose-Headers", "X-Total-Count");
			let slicer = items.slice(~~req.query._start, ~~req.query._end);
			slicer = slicer.map((item) => {
				if (item.image.length > 0) {
					let picture: IDBImage = JSON.parse(item.image);
					item.picture = picture;
				}
				item.price = item.price.replace(",", ".");
				item.price = item.price.replace(/\s+/g, "");
				return item;
			});

			if (req.query.priceSort) {
				slicer = slicer.sort((a, b) => {
					return req.query.priceSort == "decrease"
						? Number(b.price) - Number(a.price)
						: Number(a.price) - Number(b.price);
				});
			}
			res.send(slicer);
		} catch (e) {
			console.log(e);
			res.send(e);
		}
    }
}
