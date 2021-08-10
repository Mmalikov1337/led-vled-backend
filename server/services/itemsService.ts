import { IDBImage } from "./../types";
import Database from "./../Database";

class ItemsService {
	async getItems(id?: number) {
		try {
			const items = await Database.getItems(id);
			return {
				total: items.length,
				items,
			};
		} catch (e) {
			throw e;
		}
	}

	async editItems(
		name: string,
		price: string,
		kal: string,
		size: string,
		rating: string,
		description: string,
		image: IDBImage,
		quantity: number,
		id: number
	) {
		try {
			// const imageString: string = JSON.stringify(image);
			// console.log("imageString",imageString);

			return await Database.editItems(
				name,
				price,
				kal,
				size,
				rating,
				description,
				quantity,
				image,
				id
			);
		} catch (e) {
			throw e;
		}
	}

	async deleteItems(id: number) {
		try {
			return await Database.deleteItems(id);
		} catch (e) {
			throw e;
		}
	}
}

export default new ItemsService();
