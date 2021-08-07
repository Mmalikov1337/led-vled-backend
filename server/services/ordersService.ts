import { RowDataPacket } from "mysql2";
import Database from "./../Database";
import { IBasket, PaymentMethod, OrderStatus, IDBOrder, IQuery } from "./../types";

class OrdersService {
	async createOrder(
		basket: Array<IBasket>,
		name: string,
		tel: string,
		email: string,
		cityAddress: string,
		houseNumber: string,
		houseOrApartment: boolean,
		postIndex: string,
		promo: string,
		instagram: string,
		comment: string,
		deliveryMethod: number,
		paymentMethod: PaymentMethod
	) {
		if (paymentMethod === "raif") {
		} else if (paymentMethod === "sber") {
		} else if (paymentMethod === "on_receiving") {
			const status: OrderStatus = "delivered";
			await Database.insertOrder(
				basket,
				name,
				tel,
				email,
				cityAddress,
				houseNumber,
				houseOrApartment,
				postIndex,
				promo,
				instagram,
				comment,
				deliveryMethod,
				status
			);
		} else {
			console.log("Invalid payment method");
			// throw createError(400, `Payment method '${paymentMethod}' not found`);
		}
	}
	async getOrders(query: any, id?:number) {
		// if(id)
		const dbItems = await Database.getItems();
		const dbOrders = await Database.getOrders(id ?? null);

		let orders: IDBOrder[] = dbOrders.map((it, index) => {
			//Преобразование bucket из строки в массив
			if (it.basket) {
				try {
					it.basket = JSON.parse(it.basket as string);
				} catch (e) {
					console.log("Failed to parse backet", it, index, e.message, e.type);
				}
			}
			return it as IDBOrder;
		});
		const total = orders.length;
		orders.forEach((it) => {
			//Рассчет поля TotalPrice(суммарная стоимость заказа) для каждого заказа исходя из данных, переданных в backet
			it.basket.forEach((i) => {
				const itemId = i.id;
				const itemQuantity = i.quantity;
				const item = dbItems.find((i) => i.id === itemId);
				if (!item) {
					console.log(`Cant find item with id=${itemId}`, itemId);
					return;
				}
				const itemPrice = parseFloat(item.price);
				if (!itemPrice) {
					console.log(`Cant parse item with price=${itemPrice}`, item.price);
					return;
				}
				if (!itemQuantity) {
					console.log(`Backet dont have quantity, value=${itemQuantity}`);
					return;
				}
				if (!item.name) {
					console.log(`Name not found, value=${item.name}`);
					return;
				}
				const orderPrice = itemPrice * itemQuantity;
				if (!it.totalPrice) {
					it.totalPrice = 0;
				}
				it.totalPrice += orderPrice;
			});
		});
		if (query.date_gte) {
			//Фильтр "После даты"
			try {
				orders = orders.filter((it) => {
					return new Date(it.date) >= new Date(query.date_gte as string);
				});
			} catch (e) {
				console.log("Filter error date_gte.", e.message, e.type);
			}
		}
		if (query.date_lte) {
			//Фильтр "До даты"
			try {
				orders = orders.filter((it) => {
					return new Date(it.date) <= new Date(query.date_lte as string);
				});
			} catch (e) {
				console.log("Filter error date_lte.", e.message, e.type);
			}
		}
		if (query.price_gte) {
			//Фильтр "Стоимость больше чем"
			try {
				orders = orders.filter((it) => {
					return it.totalPrice >= ~~query.price_gte;
				});
			} catch (e) {
				console.log("Filter error price_gte.", e.message, e.type);
			}
		}
		if (query.price_lte) {
			//Фильтр "Стоимость меньше чем"
			try {
				orders = orders.filter((it) => {
					return it.totalPrice <= ~~query.price_lte;
				});
			} catch (e) {
				console.log("Filter error price_lte.", e.message, e.type);
			}
		}
		if (query.status) {
			//Фильтр "Статус заказа"
			try {
				orders = orders.filter((it) => {
					if (query.status instanceof Array) {
						return (query.status as Array<string>).includes(it.status);
					} else {
						return query.status == it.status;
					}
				});
			} catch (e) {
				console.log("Filter error status.", e.message, e.type);
			}
		}
		if (query.search_city) {
			//Фильтр "Поиск по городу"
			try {
				orders = orders.filter((it) =>
					it.cityAddress.toLowerCase().includes((query.search_city as string).toLowerCase())
				);
			} catch (e) {
				console.log("Filter error search_city.", e.message, e.type);
			}
		}
		if (query.search_name) {
			//Фильтр "Поиск по имени"
			try {
				orders = orders.filter((it) =>
					it.name.toLowerCase().includes((query.search_name as string).toLowerCase())
				);
			} catch (e) {
				console.log("Filter error search_name.", e.message, e.type);
			}
		}
		if (query.search_promo) {
			//Фильтр "Поиск по промокоду"
			try {
				orders = orders.filter((it) =>
					it.promo.toLowerCase().includes((query.search_promo as string).toLowerCase())
				);
			} catch (e) {
				console.log("Filter error search_promo.", e.message, e.type);
			}
		}
		if (query.search_id) {
			//Фильтр "Поиск по id"
			try {
				orders = orders.filter((it) => {
					return it.id.toString().toLowerCase() == (query.search_id as string).toLowerCase();
				});
			} catch (e) {
				console.log("Filter error search_id.", e.message, e.type);
			}
		}
		let slicedOrders = (query._start || query._end) ? orders.slice(~~query._start, ~~query._end) : orders

		if (query._sort && query._order) {
			if (query._sort == "date") {
				if (query._order == "ASC") {
					slicedOrders.sort((a, b) => {
						//возр
						const da = new Date(a.date).getTime();
						const db = new Date(b.date).getTime();

						return da > db ? 1 : -1;
					});
				} else {
					slicedOrders.sort((a, b) => {
						const da = new Date(a.date).getTime();
						const db = new Date(b.date).getTime();

						return da > db ? 0 : 1;
					});
				}
			}
		}
		return {
			total,
			orders: slicedOrders,
		};
	}
}
export default new OrdersService();
