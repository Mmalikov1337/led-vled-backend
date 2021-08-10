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
		name: string | null, 
		price: string | null, 
		kal: string | null, 
		size: string | null, 
		rating: string | null, 
		description: string | null, 
		image: IDBImage | null, 
		quantity: number | null, 
		id: number | null 
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

	async createItems(
		name: string | null,
		price: string | null,
		kal: string | null,
		size: string | null,
		rating: string | null,
		description: string | null,
		image: IDBImage | null,
		quantity: number | null
	) {
		try {
			return await Database.insertItems(
				name,
				price,
				kal,
				size,
				rating,
				description,
				image,
				quantity
			);
		} catch (e) {
			throw e;
		}
	}
}

export default new ItemsService();
