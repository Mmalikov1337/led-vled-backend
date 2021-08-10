import Database from "./../Database";

class ItemsService {
	async getItems(id?: number) {
		const items = await Database.getItems(id);
		return {
			total: items.length,
			items,
		};
	}
}

export default new ItemsService();
