export interface IFormatItem {
	description: string;
	quantity: string;
	amount: {
		value: string;
		currency: string;
	};
	vat_code: string;
	payment_mode: string;
	payment_subject: string;
}

export interface IBasket {
	id: number;
	quantity: number;
	name?: string;
}

export type PaymentMethod = "raif" | "sber" | "on_receiving";

export interface IDBImage {
	rawFile: {
		path: string;
	};
	src: string;
	title: string;
}

export interface IDBItem {
	id: number;
	price: string;
	name: string;
	description: string;
	image: string;
	quantity: number;
	picture: IDBImage;
}

// export type OrderStatus = "pending" | "waiting_for_capture" | "succeeded" | "canceled";

export type OrderStatus = "ordered" | "shipped" | "delivered" | "canceled";

export interface IDBOrder {
	id: number;
	basket: IBasket[];
	name: string;
	tel: string;
	email: string;
	cityAddress: string;
	houseNumber: string;
	houseOrApartment: string;
	postalCode: string;
	promo: string;
	instagram: string;
	comment: string;
	deliveryMethod: string;
	status: OrderStatus;
	total: number;
	uid: string;
	date: string;
	confirmation_url: string;
	totalPrice?: number;
	quantity?: number;
	product?: string;
	productPrice?: number;
}

export interface IPayment {
	id: string;
	status: OrderStatus;
	paid: boolean;
	amount: {
		value: string;
		currency: string;
	};
	confirmation: {
		type: string;
		confirmation_url: string;
	};
	date: string;
	description: string;
	metadata: {};
	recipient: {
		account_id: string;
		gateway_id: string;
	};
	refundable: boolean;
	test: boolean;
}
export interface IQuery{
	date_gte: string;
	date_lte: string;
	price_gte: any;
	price_lte: any;
	status: any;
	search_city: any;
	search_name: any;
	search_promo: any;
	search_id: any;
	_start: any;
	_end: any;
	_sort: any;
	_order: any;
}