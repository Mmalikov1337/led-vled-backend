// import express,{ json, Request, Response, urlencoded }  from "express";
// import mysql, { RowDataPacket } from "mysql2";
// import cors from "cors";
// import crypto2 from "crypto";
// // require("dotenv").config();
// // import mysql from 'mysql2'
// import path from "path";
// const app = express();
// import bodyParser from "body-parser";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// const key = "gDoa926SUHBxJq7eWAcWBg==";
// import nodemailer from "nodemailer";
// const email = "sgoldik@mail.ru";
// import axios from "axios";
// import { v4 as uuid } from "uuid";
// import createError from "http-errors";

import { Request, Response } from "express";

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const crypto2 = require("crypto");
// require("dotenv").config();
// import mysql from 'mysql2'
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const key = "gDoa926SUHBxJq7eWAcWBg==";
const nodemailer = require("nodemailer");
const email = "sgoldik@mail.ru";
const axios = require("axios");
const { v4: uuid } = require("uuid");
const createError = require("http-errors");

const gmail = {
	email: "god.nota.tl@gmail.com",
	password: "goldik12",
};

let port = process.env.PORT || 3001;
const tokenKey = crypto2.randomBytes(256).toString("base64");

const saltRounds = 12;
const myPlaintextPassword = "admin";
bcrypt.genSalt(saltRounds, function (err, salt) {
	bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
		// console.log(hash);
	});
});

try {
	const s = process.env.CLEARDB_DATABASE_URL;

	const s_proto = s ? s.substring(8) : " ";
	const s_login = s ? s_proto.substring(0, s_proto.indexOf(":")) : " ";
	const s_password = s ? s_proto.substring(s_proto.indexOf(":") + 1, s_proto.indexOf("@")) : " ";
	const url = s ? s_proto.split("@")[1] : " ";
	const urlToConnect = s ? url.substring(0, url.indexOf("/")) : " ";
	const dbName = s ? url.substring(url.indexOf("/") + 1, url.indexOf("?")) : " ";

	const pool = mysql
		.createPool({
			host: process.env.CLEARDB_DATABASE_URL ? urlToConnect : "eu-cdbr-west-01.cleardb.com",
			user: process.env.CLEARDB_DATABASE_URL ? s_login : "b0f3851f66d00f",
			database: process.env.CLEARDB_DATABASE_URL ? dbName : "heroku_e17fec03123da8c",
			password: process.env.CLEARDB_DATABASE_URL ? s_password : "6eb1694b",
		})
		.promise();

	interface IFormatItem {
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

	interface IBasket {
		id: number;
		quantity: number;
		name?: string;
	}

	type paymentMethod = "raif" | "sber" | "on_receiving";

	interface IDBImage {
		rawFile: {
			path: string;
		};
		src: string;
		title: string;
	}

	interface IDBItem {
		id: number;
		price: string;
		name: string;
		description: string;
		image: string;
		quantity: number;
		picture: IDBImage;
	}

	// type OrderStatus = "pending" | "waiting_for_capture" | "succeeded" | "canceled";

	type OrderStatus = "ordered" | "shipped" | "delivered" | "canceled";

	interface IDBOrder {
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

	interface IPayment {
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

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(cors());
	app.post("/api/orders", async (req, res, next) => {
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
			const paymentMethod: paymentMethod = req.body.paymentData.method; // payment method : yandex || sber || onDelivery

			if (!basket) throw createError(400, `basket not found`);
			if (!name) throw createError(400, `name not found`);
			if (!tel) throw createError(400, `tel number not found`);
			if (!email) throw createError(400, `email not found`);
			if (!cityAddress) throw createError(400, `cityAddress not found`);
			if (!houseNumber) throw createError(400, `houseNumber not found`);
			if (houseOrApartment === null) throw createError(400, `houseOrApartment not found`);
			if (!postIndex) throw createError(400, `postalCode not found`);
			if (!deliveryMethod) throw createError(400, `deliveryMethod not found`);

			// if (!promo) throw createError(400, `promo number not found`);
			// if (!instagram) throw createError(400, `instagram not found`);
			// if (!comment) throw createError(400, `comment not found`);

			if (paymentMethod === "raif") {
			} else if (paymentMethod === "sber") {
			} else if (paymentMethod === "on_receiving") {
				const status: OrderStatus = "delivered";
				const [rows] = await pool.execute(
					`
                INSERT INTO orders (
                    basket,
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
                    confirmation_url
                )
                VALUES (
                    '${JSON.stringify(basket)}',
                    '${name}',
                    '${tel}',
                    '${email}',
                    '${cityAddress}',
                    '${houseNumber}',
                    '${houseOrApartment}',
                    '${postIndex}',
                    '${promo}',
                    '${instagram}',
                    '${comment}',
                    '${deliveryMethod}',
                    '${status}',
                    '${null}',
                    '${null}',
                    '${null}'
                )
            `
				);
				res.status(201);
				return res.json({
					message: "OK",
				});
			} else {
				console.log("Invalid payment method");
				throw createError(400, `Payment method '${paymentMethod}' not found`);
			}
		} catch (e) {
			// console.log(e);
			next(e);
		}
	});

	app.post("/updateOrder", (req, res, next) => {
		const info = req.body;
		console.log(info);
		res.status(200).send("OK");
	});

	app.get("/api/orders", async (req: Request, res: Response) => {
		try {
			const authorization = req.query._token;
			const decoded = jwt.verify(authorization, tokenKey);
			if (!decoded) return;

			console.log(`app.get("/api/orders"`, req.path, req.query, req.params);

			const [dbOrders] = await pool.execute(`SELECT * FROM orders`);
			const [dbItems] = await pool.execute(`SELECT * FROM items`);
			// console.log("dbItems>>>", dbOrders, dbItems);

			let orders: IDBOrder[] = dbOrders.map((it, index) => {
				//Преобразование bucket из строки в массив
				if (it.basket) {
					try {
						it.basket = JSON.parse(it.basket as string);
					} catch (e) {
						console.log("Failed to parse backet", it, index, e.message, e.type);
					}
				}
				return it;
			});
			const total = orders.length;
			res.setHeader("X-Total-Count", total.toString());
			res.setHeader("Access-Control-Expose-Headers", "X-Total-Count");

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
			if (req.query.date_gte) {
				//Фильтр "После даты"
				try {
					orders = orders.filter((it) => {
						return new Date(it.date) >= new Date(req.query.date_gte as string);
					});
				} catch (e) {
					console.log("Filter error date_gte.", e.message, e.type);
				}
			}
			if (req.query.date_lte) {
				//Фильтр "До даты"
				try {
					orders = orders.filter((it) => {
						return new Date(it.date) <= new Date(req.query.date_lte as string);
					});
				} catch (e) {
					console.log("Filter error date_lte.", e.message, e.type);
				}
			}
			if (req.query.price_gte) {
				//Фильтр "Стоимость больше чем"
				try {
					orders = orders.filter((it) => {
						return it.totalPrice >= ~~req.query.price_gte;
					});
				} catch (e) {
					console.log("Filter error price_gte.", e.message, e.type);
				}
			}
			if (req.query.price_lte) {
				//Фильтр "Стоимость меньше чем"
				try {
					orders = orders.filter((it) => {
						return it.totalPrice <= ~~req.query.price_lte;
					});
				} catch (e) {
					console.log("Filter error price_lte.", e.message, e.type);
				}
			}
			if (req.query.status) {
				//Фильтр "Статус заказа"
				try {
					orders = orders.filter((it) => {
						// console.log(">>>>>>>>>>>>>>>>",req.query.status, typeof req.query.status , req.query.status instanceof Array)

						if (req.query.status instanceof Array) {
							// console.log(">>>>>>>>>>>>>>>1",(req.query.status as Array<string>).includes(it.status));
							return (req.query.status as Array<string>).includes(it.status);
						} else {
							// console.log(">>>>>>>>>>>>>>>2",req.query.status == it.status,req.query.status,it.status);
							return req.query.status == it.status;
						}
					});
				} catch (e) {
					console.log("Filter error status.", e.message, e.type);
				}
			}
			if (req.query.search_city) {
				//Фильтр "Поиск по городу"
				try {
					// orders = orders.filter((it) => {
					// 	return it.cityAddress.toLowerCase() == (req.query.search_city as string).toLowerCase();
					// });
					orders = orders.filter((it) =>
						it.cityAddress.toLowerCase().includes((req.query.search_city as string).toLowerCase())
					);
				} catch (e) {
					console.log("Filter error search_city.", e.message, e.type);
				}
			}
			if (req.query.search_name) {
				//Фильтр "Поиск по имени"
				try {
					orders = orders.filter((it) =>
						it.name.toLowerCase().includes((req.query.search_name as string).toLowerCase())
					);
				} catch (e) {
					console.log("Filter error search_name.", e.message, e.type);
				}
			}
			if (req.query.search_promo) {
				//Фильтр "Поиск по промокоду"
				try {
					orders = orders.filter((it) =>
						it.promo.toLowerCase().includes((req.query.search_promo as string).toLowerCase())
					);
				} catch (e) {
					console.log("Filter error search_promo.", e.message, e.type);
				}
			}
			if (req.query.search_id) {
				//Фильтр "Поиск по id"
				try {
					orders = orders.filter((it) => {
						return it.id.toString().toLowerCase() == (req.query.search_id as string).toLowerCase();
					});
				} catch (e) {
					console.log("Filter error search_id.", e.message, e.type);
				}
			}

			let slicedOrders = orders.slice(~~req.query._start, ~~req.query._end);

			return res.send(slicedOrders);
		} catch (e) {
			res.setHeader("X-Total-Count", 0);
			res.setHeader("Access-Control-Expose-Headers", "X-Total-Count");
			console.log(e);
			res.send(e);
		}
	});

	app.get("/api/orders/:id", async (req: Request, res: Response) => {
		try {
			console.log(`app.get("/api/orders/id"`, req.path, req.query, req.params);
			const [dbOrders] = await pool.execute(`SELECT * FROM orders WHERE id = ?`, [req.params.id]);
			const [dbItems] = await pool.execute(`SELECT * FROM items`);
			let order: IDBOrder = dbOrders.map((it, index) => {
				//Преобразование bucket из строки в массив
				if (it.basket) {
					try {
						it.basket = JSON.parse(it.basket as string);
					} catch (e) {
						console.log("Failed to parse backet", it, index, e.message, e.type);
					}
				}
				return it;
			})[0];

			//Рассчет поля TotalPrice(суммарная стоимость заказа) для каждого заказа исходя из данных, переданных в backet
			order.basket.forEach((i) => {
				const itemId = i.id;
				const itemQuantity = i.quantity;
				const item:IDBItem = dbItems.find((i) => i.id === itemId);
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
				if (!order.totalPrice) {
					order.totalPrice = 0;
				}

				i.name = item.name ?? "NO NAME"
				order.totalPrice += orderPrice;
			});

			const total = 1;
			res.setHeader("X-Total-Count", total.toString());
			res.setHeader("Access-Control-Expose-Headers", "X-Total-Count");
			res.send(order)

		} catch (e) {
			console.log(e);
			res.send(e);
		}
	});

	app.put("/api/orders/:id", async (req: Request, res: Response) => {
		try {
			const id: number = ~~req.params.id;
			const status: OrderStatus = req.body.status;

			const name = req.body.name;
			const tel = req.body.tel;
			const email = req.body.email;
			const cityAddress = req.body.cityAddress;
			const houseNumber = req.body.houseNumber;
			const houseOrApartment = req.body.houseOrApartment;
			const postalCode = req.body.postalCode;
			const deliveryMethod = req.body.deliveryMethod;

			const [rowss] = await pool.execute(
				`SELECT * FROM orders WHERE id = ${req.params.id}
	    `
			);
			console.log("rowss>>>>>>>>>>>>", rowss);

			const authorization = req.header("authorization");
			const decoded = jwt.verify(authorization, tokenKey);

			if (decoded.id && decoded.iat) {
				console.log("!!!!!!!!!!!!!!!!!!!!!!!!!");

				await pool.execute(
					`
					UPDATE orders SET
						name = ?,
						tel = ?,
						email = ?,
						cityAddress = ?,
						houseNumber = ?,
						houseOrApartment = ?,
						postalCode = ?
						WHERE id=?
				`,
					[name, tel, email, cityAddress, houseNumber, houseOrApartment, postalCode, id]
				);
				res.send({ id: id });
			}
		} catch (e) {
			console.log(e);
			res.send(e);
		}
	});

	app.delete("/api/orders/:id", async (req: Request, res: Response) => {
		try {
			const id = req.params.id;
			const authorization = req.header("authorization");
			const decoded = jwt.verify(authorization, tokenKey);

			if (decoded.id && decoded.iat) {
				await pool.execute(
					`
                    DELETE FROM orders
                    WHERE id = '${id}'
                `
				);
				res.send({ id: id });
			}
		} catch (e) {
			console.log(e);
			res.send(e);
		}
	});

	app.get("/api/items", async (req: Request, res: Response) => {
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
	});

	app.put("/api/items/:id", async (req: Request, res: Response) => {
		try {
			const id: number = ~~req.params.id;
			const name: string = req.body.name;
			const price: string = req.body.price;
			const kal: string = req.body.kal;
			const size: string = req.body.kal;
			const rating: string = req.body.rating;
			const description: string = req.body.description;
			const picture: IDBImage = req.body.picture;
			const quantity: number = req.body.quantity;
			const pictureString: string = JSON.stringify(picture);

			const authorization = req.header("authorization");
			const decoded = jwt.verify(authorization, tokenKey);

			if (decoded.id && decoded.iat) {
				await pool.execute(
					`
                    UPDATE items SET
                        name = '${name}',
                        price = '${price}',
                        kal = '${kal}',
                        size = '${size}',
                        rating = '${rating}',
                        description = '${description}',
                        quantity = '${quantity}',
                        image = '${pictureString}'
                    WHERE id = '${id}'
                `
				);
				res.send({ id: id });
			}
		} catch (e) {
			console.log(e);
			res.send(e);
		}
	});

	app.post("/api/authenticate", async (req: Request, res: Response) => {
		try {
			const [rows] = await pool.execute(
				`SELECT * FROM admins WHERE username = '${req.body.username}'`
			);
			const string = JSON.stringify(rows);
			let admin = JSON.parse(string)[0];

			if (admin) {
				let access = await bcrypt.compare(req.body.password, admin.password);
				if (req.body.username === admin.username && access) {
					return res.status(200).json({
						id: admin.id,
						login: admin.username,
						token: jwt.sign({ id: admin.id }, tokenKey, { expiresIn: "1h" }),
					});
				}
			}

			return res.status(404).json({ message: "Неправильный логин / пароль" });
		} catch (e) {
			console.log(e);
			res.send(e);
		}
	});

	app.post("/api/checkAuth", async (req: Request, res: Response) => {
		try {
			jwt.verify(req.body.token, tokenKey, (err, decoded) => {
				if (err) {
					return res.status(300).json({ message: "err" });
				} else {
					return res.status(200).json({ message: "norm" });
				}
			});
		} catch (e) {
			console.log(e);
		}
	});

	app.get("/api/items/:id", async (req: Request, res: Response) => {
		try {
			const [rows] = await pool.execute(`SELECT * FROM items WHERE id = ${req.params.id}`);
			const string = JSON.stringify(rows);
			let item: IDBItem = JSON.parse(string)[0];

			item.price = item.price.replace(",", ".");
			item.price = item.price.replace(/\s+/g, "");

			if (item.image.length > 0) {
				let picture: IDBImage = JSON.parse(item.image);
				item.picture = picture;
			}

			res.send(item);
		} catch (e) {
			console.log(e);
			res.send(e);
		}
	});

	app.delete("/api/items/:id", async (req: Request, res: Response) => {
		try {
			const id: number = ~~req.params.id;
			const authorization = req.header("authorization");
			const decoded = jwt.verify(authorization, tokenKey);

			if (decoded.id && decoded.iat) {
				await pool.execute(
					`
                    DELETE FROM items
                    WHERE id = '${id}'
                `
				);
				res.send({ id: id });
			}
		} catch (e) {
			console.log(e);
			res.send(e);
		}
	});

	app.post("/api/items", async (req: Request, res: Response) => {
		try {
			const name: string = req.body.name;
			const price: string = req.body.price;
			const kal: string = req.body.kal;
			const size: string = req.body.kal;
			const rating: string = req.body.rating;
			const description: string = req.body.description;
			const picture: IDBImage = req.body.picture;
			const quantity: number = req.body.quantity;
			const pictureString: string = JSON.stringify(picture);

			const authorization = req.header("authorization");
			const decoded = jwt.verify(authorization, tokenKey);

			if (decoded.id && decoded.iat) {
				const [rows] = await pool.execute(
					`
                INSERT INTO items (
                    name,
                    price,
                    kal,
                    size,
                    rating,
                    description,
                    quantity,
                    picture
                )
                VALUES (
                    '${name}',
                    '${price}',
                    '${kal}',
                    '${size}',
                    '${rating}',
                    '${description}',
                    '${quantity}',
                    '${pictureString}'
                )
            `
				);
				const string = JSON.stringify(rows);
				let item = JSON.parse(string);
				res.send({ id: item.insertId });
			}
		} catch (e) {
			console.log(e);
			res.send(e);
		}
	});

	app.get("/test", async (req: Request, res: Response) => {
		const payload = {
			message: "OK",
			// s_login,
			// s_password,
			// urlToConnect,
			// dbName
		};
		// res.send("OK")
		res.json(payload);
	});

	app.use(express.static(__dirname + "/dist"));

	app.get("*", (req: Request, res: Response) => {
		// res.redirect("/")
		res.sendFile(path.resolve(__dirname, "index.html"));
	});

	app.use((error, req, res, next) => {
		// console.log("ghjgjhgjhgjhjhgjhgjhgjhgjhgjhgjhgjhg");

		if (error) {
			console.log("Error status: ", error.status);
			console.log("Message: ", error.message);
			res.status(error.status);

			// Отправка ответа
			return res.json({
				status: error.status,
				message: error.message,
				stack: error.stack,
			});
		}
		res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
		res.header("Access-Control-Allow-Credentials", "true");
		res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE, PUT");
		res.header("Access-Control-Allow-Headers", "accept, content-type, if-modified-since");
		return next();
	});
	app.listen(port, () => {
		console.log(__dirname); // eslint-disable-line no-console
		console.log("Listening Port " + port); // eslint-disable-line no-console
	});
} catch (e) {
	console.log("err", e.message);
}
