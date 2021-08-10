import { NextFunction, Response, Request } from "express";
import OrdersService from "./../services/ordersService";
import { IBasket, IDBItem, IDBOrder, IQuery, OrderStatus, PaymentMethod } from "./../types";
import ClientError from "./../Errors/ClientError";
class OrdersController {
	async createOrder(req: Request, res: Response, next: NextFunction) {
		try {
			const basket: Array<IBasket> = req.body.basket;
			/* ORDERDATA */
			const name: string = req.body.orderData.name; // customer name : String
			const tel: string = req.body.orderData.tel; // telephone number : String
			const email: string = req.body.orderData.email; // email : String
			const cityAddress: string = req.body.orderData.cityAddress; // city, address : String
			const houseNumber: string = req.body.orderData.houseNumber; // house / apartment number : String
			const houseOrApartment: boolean = req.body.orderData.houseOrApartment; // 'house' (true) or 'apartment' (false) : Boolean
			const postIndex: string = req.body.orderData.postIndex; // postalCode : String
			const promo: string = req.body.orderData.promo; // promo : String
			const instagram: string = req.body.orderData.instagram; // instagram : String
			const comment: string = req.body.orderData.comment; // comment : String
			/* DELIVERYDATA */
			const deliveryMethod: number = req.body.deliveryData.method; // delivery method : Number
			/* PAYMENTDATA */
			const paymentMethod: PaymentMethod = req.body.paymentData.method; // payment method : yandex || sber || onDelivery

			if (!basket) throw ClientError.badRequest(`basket not found`);
			if (!name) throw ClientError.badRequest(`name not found`);
			if (!tel) throw ClientError.badRequest(`tel number not fou`);
			if (!email) throw ClientError.badRequest(`email not found`);
			if (!cityAddress) throw ClientError.badRequest(`cityAddress not found`);
			if (!houseNumber) throw ClientError.badRequest(`houseNumber not found`);
			if (houseOrApartment === null) throw ClientError.badRequest(`houseOrApartment not found`);
			if (!postIndex) throw ClientError.badRequest(`postalCode not found`);
			if (!deliveryMethod) throw ClientError.badRequest(`deliveryMethod not found`);

			OrdersService.createOrder(
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
				paymentMethod
			);
			res.status(201);

			return res.json({
				message: "OK",
			});
		} catch (e) {
			next(e);
		}
	}
	async getOrders(req: Request, res: Response, next: NextFunction) {
		try {
			const { total, orders } = await OrdersService.getOrders(req.query, ~~req.params.id ?? null);

			res.setHeader("X-Total-Count", total.toString());
			res.setHeader("Access-Control-Expose-Headers", "X-Total-Count");
			if (req.params.id)
				//Если только один заказ, то полученный массив надо развернуть
				return res.send(...orders);
			else return res.send(orders);
		} catch (e) {
			next(e);
		}
	}
	async editOrders(req: Request, res: Response, next: NextFunction) {
		try {
			const id: number | null = ~~req.params.id ?? null;
			const name: string | null = req.body.name ?? null;
			const tel: string | null = req.body.tel ?? null;
			const email: string | null = req.body.email ?? null;
			const cityAddress: string | null = req.body.cityAddress ?? null;
			const houseNumber: string | null = req.body.houseNumber ?? null;
			const houseOrApartment: boolean | null = req.body.houseOrApartment ?? null;
			const postalCode: string | null = req.body.postalCode ?? null;
			const promo: string | null = req.body.promo ?? null;
			const instagram: string | null = req.body.instagram ?? null;
			const comment: string | null = req.body.comment ?? null;
			const deliveryMethod: string | null = req.body.deliveryMethod ?? null;
			const status: OrderStatus | null = req.body.status ?? null;
			const uid: string | null = req.body.uid ?? null;
			const date: Date | null = new Date(req.body.date) ?? null;
			const confirmation_url: string | null = req.body.confirmation_url ?? null;
			// const totalPrice: string = req.body.totalPrice;

			await OrdersService.editOrders(
				name,
				tel,
				email,
				cityAddress,
				houseNumber,
				houseOrApartment,
				postalCode,
				promo,
				instagram,
				comment,
				deliveryMethod,
				status,
				uid,
				date,
				confirmation_url,
				id
			);

			res.status(200);
			return res.send({ id: id });
		} catch (e) {
			console.log(e);
			res.send(e);
		}
	}
	async deleteOrders(req: Request, res: Response, next: NextFunction) {
		try {
			const id = ~~req.params.id;
			if (!id) {
				throw ClientError.badRequest("Wrong id");
			}
			const isDeleted = await OrdersService.deleteOrders(id);
			if(!isDeleted){
				console.log(`Order with id=${id} has not deleted.`)
			}
			res.send({ id: id });
		} catch (e) {
			console.log(e);
			res.send(e);
		}
		// });
	}
}

export default new OrdersController();
