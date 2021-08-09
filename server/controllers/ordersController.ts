import { NextFunction, Response, Request } from "express";
import OrdersService from "./../services/ordersService";
import { IBasket, IDBItem, IDBOrder, IQuery, OrderStatus, PaymentMethod } from "./../types";
import ClientError from "./../Errors/ClientError";
class OrdersController {
	async createOrder(req: Request, res: Response, next: NextFunction) {
		try {
			console.log("req.body", req.body);
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
			// console.log(e);
			next(e);
		}
	}
	async getOrders(req: Request, res: Response, next: NextFunction) {
		try {
			console.log(`app.get("/api/orders"`, req.path, req.query, req.params);
			const { total, orders } = await OrdersService.getOrders(req.query, ~~req.params.id ?? null);

			res.setHeader("X-Total-Count", total.toString());
			res.setHeader("Access-Control-Expose-Headers", "X-Total-Count");
			if (req.params.id)
				//Если только один заказ, то полученный массив надо развернуть
				return res.send(...orders);
			else return res.send(orders);
		} catch (e) {
			// console.log(e);
			next(e);
		}
	}
	async editOrders(req: Request, res: Response, next: NextFunction) {
		try {
			const id: number = ~~req.params.id;
			const name: string = req.body.name;
			const tel: string = req.body.tel;
			const email: string = req.body.email;
			const cityAddress: string = req.body.cityAddress;
			const houseNumber: string = req.body.houseNumber;
			const houseOrApartment: boolean = req.body.houseOrApartment;
			const postalCode: string = req.body.postalCode;
			const promo: string = req.body.promo;
			const instagram: string = req.body.instagram;
			const comment: string = req.body.comment;
			const deliveryMethod: string = req.body.deliveryMethod;
			const status: OrderStatus = req.body.status;
			const uid: string = req.body.uid;
			const date: Date = new Date(req.body.date);
			const confirmation_url: string = req.body.confirmation_url;
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
	// async getOrder(req: Request, res: Response, next: NextFunction) {
	// 	try {
	// 		console.log(`app.get("/api/orders/asd"`, req.path, req.query, req.params);

	// 		const { total, orders } = await ordersService.getOrders(req.query, ~~req.params.id);
	// 		res.setHeader("X-Total-Count", total.toString());
	// 		res.setHeader("Access-Control-Expose-Headers", "X-Total-Count");
	// 		return res.send(...orders);
	// 	} catch (e) {
	// 		console.log(e);
	// 		res.send(e);
	// 	}
	// }
}

export default new OrdersController();
