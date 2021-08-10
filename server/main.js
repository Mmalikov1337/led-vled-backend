"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var config_1 = require("./config");
var Database_1 = require("./Database");
var items_1 = require("./routers/items");
var orders_1 = require("./routers/orders");
var express = require("express");
var mysql = require("mysql2");
var cors = require("cors");
var crypto2 = require("crypto");
// require("dotenv").config();
// import mysql from 'mysql2'
var path = require("path");
var app = express();
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var key = "gDoa926SUHBxJq7eWAcWBg==";
var nodemailer = require("nodemailer");
var email = "sgoldik@mail.ru";
var axios = require("axios");
var uuid = require("uuid").v4;
var createError = require("http-errors");
var gmail = {
    email: "god.nota.tl@gmail.com",
    password: "goldik12"
};
var port = process.env.PORT || 3001;
var saltRounds = 7;
var myPlaintextPassword = "admin";
bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
        console.log(hash);
    });
});
function main() {
    var _this = this;
    // $2b$07$Y5jENivC8lJLc5tqJ67B9OqZuv13s/ouioOfB0ogcEJI5L2sLGeF.
    try {
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(cors());
        app.use(function (req, res, next) {
            console.log(req.path, req.method, {
                "req.params": req.params,
                "req.query": req.query,
                "req.body": req.body
            }, { "req.headers.authorization": req.headers.authorization });
            return next();
        });
        app.use("/api/orders", orders_1["default"]);
        app.use("/api/items", items_1["default"]);
        // app.post("/api/orders", async (req, res, next) => {
        // 	try {
        // 		console.log("req.body", req.body);
        // 		const basket: Array<IBasket> = req.body.basket;
        // 		/* ORDERDATA */
        // 		const name: string = req.body.orderData.name; // customer name : String
        // 		const tel: string = req.body.orderData.tel; // telephone number : String
        // 		const email: string = req.body.orderData.email; // email : String
        // 		const cityAddress: string = req.body.orderData.cityAddress; // city, address : String
        // 		const houseNumber: string = req.body.orderData.houseNumber; // house / apartment number : String
        // 		const houseOrApartment: boolean = req.body.orderData.houseOrApartment; // 'house' (true) or 'apartment' (false) : Boolean
        // 		const postIndex: string = req.body.orderData.postIndex; // postalCode : String
        // 		const promo: string = req.body.orderData.promo; // promo : String
        // 		const instagram: string = req.body.orderData.instagram; // instagram : String
        // 		const comment: string = req.body.orderData.comment; // comment : String
        // 		/* DELIVERYDATA */
        // 		const deliveryMethod: number = req.body.deliveryData.method; // delivery method : Number
        // 		/* PAYMENTDATA */
        // 		const paymentMethod: paymentMethod = req.body.paymentData.method; // payment method : yandex || sber || onDelivery
        // 		if (!basket) throw createError(400, `basket not found`);
        // 		if (!name) throw createError(400, `name not found`);
        // 		if (!tel) throw createError(400, `tel number not found`);
        // 		if (!email) throw createError(400, `email not found`);
        // 		if (!cityAddress) throw createError(400, `cityAddress not found`);
        // 		if (!houseNumber) throw createError(400, `houseNumber not found`);
        // 		if (houseOrApartment === null) throw createError(400, `houseOrApartment not found`);
        // 		if (!postIndex) throw createError(400, `postalCode not found`);
        // 		if (!deliveryMethod) throw createError(400, `deliveryMethod not found`);
        // 		// if (!promo) throw createError(400, `promo number not found`);
        // 		// if (!instagram) throw createError(400, `instagram not found`);
        // 		// if (!comment) throw createError(400, `comment not found`);
        // 		if (paymentMethod === "raif") {
        // 		} else if (paymentMethod === "sber") {
        // 		} else if (paymentMethod === "on_receiving") {
        // 			const status: OrderStatus = "delivered";
        // 			const [rows] = await pool.execute(
        // 				`
        //             INSERT INTO orders (
        //                 basket,
        //                 name,
        //                 tel,
        //                 email,
        //                 cityAddress,
        //                 houseNumber,
        //                 houseOrApartment,
        //                 postalCode,
        //                 promo,
        //                 instagram,
        //                 comment,
        //                 deliveryMethod,
        //                 status,
        //                 uid,
        //                 date,
        //                 confirmation_url
        //             )
        //             VALUES (
        //                 '${JSON.stringify(basket)}',
        //                 '${name}',
        //                 '${tel}',
        //                 '${email}',
        //                 '${cityAddress}',
        //                 '${houseNumber}',
        //                 '${houseOrApartment}',
        //                 '${postIndex}',
        //                 '${promo}',
        //                 '${instagram}',
        //                 '${comment}',
        //                 '${deliveryMethod}',
        //                 '${status}',
        //                 '${null}',
        //                 '${null}',
        //                 '${null}'
        //             )
        //         `
        // 			);
        // 			res.status(201);
        // 			return res.json({
        // 				message: "OK",
        // 			});
        // 		} else {
        // 			console.log("Invalid payment method");
        // 			throw createError(400, `Payment method '${paymentMethod}' not found`);
        // 		}
        // 	} catch (e) {
        // 		// console.log(e);
        // 		next(e);
        // 	}
        // });
        // app.post("/updateOrder", (req, res, next) => {
        // 	const info = req.body;
        // 	console.log(info);
        // 	res.status(200).send("OK");
        // });
        // app.get("/api/orders", async (req: Request, res: Response) => {
        // 	try {
        // 		const authorization = req.query._token;
        // 		const decoded = jwt.verify(authorization, tokenKey);
        // 		if (!decoded) return;
        // 		console.log(`app.get("/api/orders"`, req.path, req.query, req.params);
        // 		const [dbOrders] = await pool.execute(`SELECT * FROM orders`);
        // 		const [dbItems] = await pool.execute(`SELECT * FROM items`);
        // 		// console.log("dbItems>>>", dbOrders, dbItems);
        // 		let orders: IDBOrder[] = dbOrders.map((it, index) => {
        // 			//Преобразование bucket из строки в массив
        // 			if (it.basket) {
        // 				try {
        // 					it.basket = JSON.parse(it.basket as string);
        // 				} catch (e) {
        // 					console.log("Failed to parse backet", it, index, e.message, e.type);
        // 				}
        // 			}
        // 			return it;
        // 		});
        // 		const total = orders.length;
        // 		res.setHeader("X-Total-Count", total.toString());
        // 		res.setHeader("Access-Control-Expose-Headers", "X-Total-Count");
        // 		orders.forEach((it) => {
        // 			//Рассчет поля TotalPrice(суммарная стоимость заказа) для каждого заказа исходя из данных, переданных в backet
        // 			it.basket.forEach((i) => {
        // 				const itemId = i.id;
        // 				const itemQuantity = i.quantity;
        // 				const item = dbItems.find((i) => i.id === itemId);
        // 				if (!item) {
        // 					console.log(`Cant find item with id=${itemId}`, itemId);
        // 					return;
        // 				}
        // 				const itemPrice = parseFloat(item.price);
        // 				if (!itemPrice) {
        // 					console.log(`Cant parse item with price=${itemPrice}`, item.price);
        // 					return;
        // 				}
        // 				if (!itemQuantity) {
        // 					console.log(`Backet dont have quantity, value=${itemQuantity}`);
        // 					return;
        // 				}
        // 				if (!item.name) {
        // 					console.log(`Name not found, value=${item.name}`);
        // 					return;
        // 				}
        // 				const orderPrice = itemPrice * itemQuantity;
        // 				if (!it.totalPrice) {
        // 					it.totalPrice = 0;
        // 				}
        // 				it.totalPrice += orderPrice;
        // 			});
        // 		});
        // 		if (req.query.date_gte) {
        // 			//Фильтр "После даты"
        // 			try {
        // 				orders = orders.filter((it) => {
        // 					return new Date(it.date) >= new Date(req.query.date_gte as string);
        // 				});
        // 			} catch (e) {
        // 				console.log("Filter error date_gte.", e.message, e.type);
        // 			}
        // 		}
        // 		if (req.query.date_lte) {
        // 			//Фильтр "До даты"
        // 			try {
        // 				orders = orders.filter((it) => {
        // 					return new Date(it.date) <= new Date(req.query.date_lte as string);
        // 				});
        // 			} catch (e) {
        // 				console.log("Filter error date_lte.", e.message, e.type);
        // 			}
        // 		}
        // 		if (req.query.price_gte) {
        // 			//Фильтр "Стоимость больше чем"
        // 			try {
        // 				orders = orders.filter((it) => {
        // 					return it.totalPrice >= ~~req.query.price_gte;
        // 				});
        // 			} catch (e) {
        // 				console.log("Filter error price_gte.", e.message, e.type);
        // 			}
        // 		}
        // 		if (req.query.price_lte) {
        // 			//Фильтр "Стоимость меньше чем"
        // 			try {
        // 				orders = orders.filter((it) => {
        // 					return it.totalPrice <= ~~req.query.price_lte;
        // 				});
        // 			} catch (e) {
        // 				console.log("Filter error price_lte.", e.message, e.type);
        // 			}
        // 		}
        // 		if (req.query.status) {
        // 			//Фильтр "Статус заказа"
        // 			try {
        // 				orders = orders.filter((it) => {
        // 					// console.log(">>>>>>>>>>>>>>>>",req.query.status, typeof req.query.status , req.query.status instanceof Array)
        // 					if (req.query.status instanceof Array) {
        // 						// console.log(">>>>>>>>>>>>>>>1",(req.query.status as Array<string>).includes(it.status));
        // 						return (req.query.status as Array<string>).includes(it.status);
        // 					} else {
        // 						// console.log(">>>>>>>>>>>>>>>2",req.query.status == it.status,req.query.status,it.status);
        // 						return req.query.status == it.status;
        // 					}
        // 				});
        // 			} catch (e) {
        // 				console.log("Filter error status.", e.message, e.type);
        // 			}
        // 		}
        // 		if (req.query.search_city) {
        // 			//Фильтр "Поиск по городу"
        // 			try {
        // 				// orders = orders.filter((it) => {
        // 				// 	return it.cityAddress.toLowerCase() == (req.query.search_city as string).toLowerCase();
        // 				// });
        // 				orders = orders.filter((it) =>
        // 					it.cityAddress.toLowerCase().includes((req.query.search_city as string).toLowerCase())
        // 				);
        // 			} catch (e) {
        // 				console.log("Filter error search_city.", e.message, e.type);
        // 			}
        // 		}
        // 		if (req.query.search_name) {
        // 			//Фильтр "Поиск по имени"
        // 			try {
        // 				orders = orders.filter((it) =>
        // 					it.name.toLowerCase().includes((req.query.search_name as string).toLowerCase())
        // 				);
        // 			} catch (e) {
        // 				console.log("Filter error search_name.", e.message, e.type);
        // 			}
        // 		}
        // 		if (req.query.search_promo) {
        // 			//Фильтр "Поиск по промокоду"
        // 			try {
        // 				orders = orders.filter((it) =>
        // 					it.promo.toLowerCase().includes((req.query.search_promo as string).toLowerCase())
        // 				);
        // 			} catch (e) {
        // 				console.log("Filter error search_promo.", e.message, e.type);
        // 			}
        // 		}
        // 		if (req.query.search_id) {
        // 			//Фильтр "Поиск по id"
        // 			try {
        // 				orders = orders.filter((it) => {
        // 					return it.id.toString().toLowerCase() == (req.query.search_id as string).toLowerCase();
        // 				});
        // 			} catch (e) {
        // 				console.log("Filter error search_id.", e.message, e.type);
        // 			}
        // 		}
        // 		let slicedOrders = orders.slice(~~req.query._start, ~~req.query._end);
        // 		if (req.query._sort && req.query._order) {
        // 			if (req.query._sort == "date") {
        // 				if (req.query._order == "ASC") {
        // 					console.log("sort 1");
        // 					slicedOrders.sort((a, b) => {
        // 						//возр
        // 						const da = new Date(a.date).getTime();
        // 						const db = new Date(b.date).getTime();
        // 						return da > db ? 1 : -1;
        // 					});
        // 				} else {
        // 					console.log("sort 2");
        // 					slicedOrders.sort((a, b) => {
        // 						const da = new Date(a.date).getTime();
        // 						const db = new Date(b.date).getTime();
        // 						return da > db ? 0 : 1;
        // 					});
        // 				}
        // 			}
        // 		}
        // 		return res.send(slicedOrders);
        // 	} catch (e) {
        // 		res.setHeader("X-Total-Count", 0);
        // 		res.setHeader("Access-Control-Expose-Headers", "X-Total-Count");
        // 		console.log(e);
        // 		res.send(e);
        // 	}
        // });
        // app.get("/api/orders/:id", async (req: Request, res: Response) => {
        // 	try {
        // 		console.log(`app.get("/api/orders/id"`, req.path, req.query, req.params);
        // 		const [dbOrders] = await pool.execute(`SELECT * FROM orders WHERE id = ?`, [req.params.id]);
        // 		const [dbItems] = await pool.execute(`SELECT * FROM items`);
        // 		let order: IDBOrder = dbOrders.map((it, index) => {
        // 			//Преобразование bucket из строки в массив
        // 			if (it.basket) {
        // 				try {
        // 					it.basket = JSON.parse(it.basket as string);
        // 				} catch (e) {
        // 					console.log("Failed to parse backet", it, index, e.message, e.type);
        // 				}
        // 			}
        // 			return it;
        // 		})[0];
        // 		//Рассчет поля TotalPrice(суммарная стоимость заказа) для каждого заказа исходя из данных, переданных в backet
        // 		order.basket.forEach((i) => {
        // 			const itemId = i.id;
        // 			const itemQuantity = i.quantity;
        // 			const item: IDBItem = dbItems.find((i) => i.id === itemId);
        // 			if (!item) {
        // 				console.log(`Cant find item with id=${itemId}`, itemId);
        // 				return;
        // 			}
        // 			const itemPrice = parseFloat(item.price);
        // 			if (!itemPrice) {
        // 				console.log(`Cant parse item with price=${itemPrice}`, item.price);
        // 				return;
        // 			}
        // 			if (!itemQuantity) {
        // 				console.log(`Backet dont have quantity, value=${itemQuantity}`);
        // 				return;
        // 			}
        // 			if (!item.name) {
        // 				console.log(`Name not found, value=${item.name}`);
        // 				return;
        // 			}
        // 			const orderPrice = itemPrice * itemQuantity;
        // 			if (!order.totalPrice) {
        // 				order.totalPrice = 0;
        // 			}
        // 			i.name = item.name ?? "NO NAME";
        // 			order.totalPrice += orderPrice;
        // 		});
        // 		const total = 1;
        // 		res.setHeader("X-Total-Count", total.toString());
        // 		res.setHeader("Access-Control-Expose-Headers", "X-Total-Count");
        // 		res.send(order);
        // 	} catch (e) {
        // 		console.log(e);
        // 		res.send(e);
        // 	}
        // });
        // app.put("/api/orders/:id", async (req: Request, res: Response) => {
        // 	try {
        // 		console.log("/api/orders/:id", req.params, req.body);
        // 		const authorization = req.header("authorization");
        // 		const decoded = jwt.verify(authorization, tokenKey);
        // 		const id: number = ~~req.params.id;
        // 		const name: string = req.body.name;
        // 		const tel: string = req.body.tel;
        // 		const email: string = req.body.email;
        // 		const cityAddress: string = req.body.cityAddress;
        // 		const houseNumber: string = req.body.houseNumber;
        // 		const houseOrApartment: boolean = req.body.houseOrApartment;
        // 		const postalCode: string = req.body.postalCode;
        // 		const promo: string = req.body.promo;
        // 		const instagram: string = req.body.instagram;
        // 		const comment: string = req.body.comment;
        // 		const deliveryMethod: string = req.body.deliveryMethod;
        // 		const status: OrderStatus = req.body.status;
        // 		const uid: string = req.body.uid;
        // 		const date: Date = new Date(req.body.date);
        // 		const confirmation_url: string = req.body.confirmation_url;
        // 		const totalPrice: string = req.body.totalPrice;
        // 		const [dbOrders]: [IDBOrder[]] = await pool.execute("SELECT id FROM orders WHERE id = ?", [
        // 			req.params.id,
        // 		]);
        // 		if (!dbOrders[0].id) {
        // 			console.log(`Order with id=${id} not found`);
        // 			res.status(404);
        // 			return res.send({ message: `Order with id=${id} not found` });
        // 		}
        // 		await pool.execute(
        // 			"UPDATE orders SET " +
        // 				"name = ? , " +
        // 				"tel = ? , " +
        // 				"email = ? , " +
        // 				"cityAddress = ? , " +
        // 				"houseNumber = ? , " +
        // 				"houseOrApartment = ? , " +
        // 				"postalCode = ? , " +
        // 				"promo = ? , " +
        // 				"instagram = ? , " +
        // 				"comment = ? , " +
        // 				"deliveryMethod = ? , " +
        // 				"status = ? , " +
        // 				"uid = ? , " +
        // 				"date = ? , " +
        // 				"confirmation_url = ? " +
        // 				"WHERE id = ?",
        // 			[
        // 				name,
        // 				tel,
        // 				email,
        // 				cityAddress,
        // 				houseNumber,
        // 				houseOrApartment,
        // 				postalCode,
        // 				promo,
        // 				instagram,
        // 				comment,
        // 				deliveryMethod,
        // 				status,
        // 				uid,
        // 				date,
        // 				confirmation_url,
        // 				id,
        // 			]
        // 		);
        // 		res.status(200);
        // 		return res.send({ id: id });
        // 	} catch (e) {
        // 		console.log(e);
        // 		res.send(e);
        // 	}
        // });
        // app.delete("/api/orders/:id", async (req: Request, res: Response) => {
        // 	try {
        // 		const id = req.params.id;
        // 		const authorization = req.header("authorization");
        // 		const decoded = jwt.verify(authorization, tokenKey);
        // 		if (decoded.id && decoded.iat) {
        // 			await pool.execute(
        // 				`
        //                 DELETE FROM orders
        //                 WHERE id = '${id}'
        //             `
        // 			);
        // 			res.send({ id: id });
        // 		}
        // 	} catch (e) {
        // 		console.log(e);
        // 		res.send(e);
        // 	}
        // });
        // app.get("/api/items", async (req: Request, res: Response) => {
        // 	try {
        // 		const [rows] = await pool.execute(`SELECT * FROM items`);
        // 		const string = JSON.stringify(rows);
        // 		let items: IDBItem[] = JSON.parse(string);
        // 		if (req.query.name) {
        // 			items = items.filter((e) =>
        // 				e.name.toLowerCase().includes((req.query.name as string).toLowerCase())
        // 			);
        // 		}
        // 		const total = items.length;
        // 		res.set("X-Total-Count", total.toString());
        // 		res.header("Access-Control-Expose-Headers", "X-Total-Count");
        // 		let slicer = items.slice(~~req.query._start, ~~req.query._end);
        // 		slicer = slicer.map((item) => {
        // 			if (item.image.length > 0) {
        // 				let picture: IDBImage = JSON.parse(item.image);
        // 				item.picture = picture;
        // 			}
        // 			item.price = item.price.replace(",", ".");
        // 			item.price = item.price.replace(/\s+/g, "");
        // 			return item;
        // 		});
        // 		if (req.query.priceSort) {
        // 			slicer = slicer.sort((a, b) => {
        // 				return req.query.priceSort == "decrease"
        // 					? Number(b.price) - Number(a.price)
        // 					: Number(a.price) - Number(b.price);
        // 			});
        // 		}
        // 		res.send(slicer);
        // 	} catch (e) {
        // 		console.log(e);
        // 		res.send(e);
        // 	}
        // });
        // app.put("/api/items/:id", async (req: Request, res: Response) => {
        // 	try {
        // 		console.log("/api/items/:id PUT", req.params, req.body);
        // 		const id: number = ~~req.params.id;
        // 		const name: string = req.body.name;
        // 		const price: string = req.body.price;
        // 		const kal: string = req.body.kal;
        // 		const size: string = req.body.kal;
        // 		const rating: string = req.body.rating;
        // 		const description: string = req.body.description;
        // 		const picture: IDBImage = req.body.picture;
        // 		const quantity: number = req.body.quantity;
        // 		const pictureString: string = JSON.stringify(picture);
        // 		const authorization = req.header("authorization");
        // 		const decoded = jwt.verify(authorization, tokenKey);
        // 		if (decoded.id && decoded.iat) {
        // 			await pool.execute(
        // 				`
        //                 UPDATE items SET
        //                     name = '${name}',
        //                     price = '${price}',
        //                     kal = '${kal}',
        //                     size = '${size}',
        //                     rating = '${rating}',
        //                     description = '${description}',
        //                     quantity = '${quantity}',
        //                     image = '${pictureString}'
        //                 WHERE id = '${id}'
        //             `
        // 			);
        // 			res.send({ id: id });
        // 		}
        // 	} catch (e) {
        // 		console.log(e);
        // 		res.send(e);
        // 	}
        // });
        app.post("/api/authenticate", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var rows, string, adminDB, jwtToken, access, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        // const [rows] = await pool.execute(
                        // 	`SELECT * FROM admins WHERE username = '${req.body.username}'`
                        // );
                        console.log("1", req.body.username);
                        return [4 /*yield*/, Database_1["default"].executeAny("SELECT * FROM admins WHERE username = '" + req.body.username + "'")];
                    case 1:
                        rows = _a.sent();
                        console.log("rows", rows);
                        string = JSON.stringify(rows);
                        console.log("2", string);
                        adminDB = JSON.parse(string)[0];
                        console.log("3", adminDB);
                        jwtToken = jwt.sign({ id: adminDB.id }, config_1.tokenKey, { expiresIn: "1h" });
                        console.log("token", jwtToken);
                        if (!adminDB) return [3 /*break*/, 3];
                        console.log("ASDASD", adminDB);
                        return [4 /*yield*/, bcrypt.compare(req.body.password, adminDB.password)];
                    case 2:
                        access = _a.sent();
                        console.log("access", access);
                        if (req.body.username === adminDB.username && access) {
                            return [2 /*return*/, res.status(200).json({
                                    id: adminDB.id,
                                    login: adminDB.username,
                                    token: jwtToken
                                })];
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/, res.status(401).json({ message: "Неправильный логин / пароль" })];
                    case 4:
                        e_1 = _a.sent();
                        console.log(e_1);
                        res.send(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        app.post("/api/checkAuth", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    jwt.verify(req.body.token, config_1.tokenKey, function (err, decoded) {
                        if (err) {
                            return res.status(300).json({ message: "err" });
                        }
                        else {
                            return res.status(200).json({ message: "norm" });
                        }
                    });
                }
                catch (e) {
                    console.log(e);
                }
                return [2 /*return*/];
            });
        }); });
        // app.get("/api/items/:id", async (req: Request, res: Response) => {
        // 	try {
        // 		const [rows] = await pool.execute(`SELECT * FROM items WHERE id = ${req.params.id}`);
        // 		const string = JSON.stringify(rows);
        // 		let item: IDBItem = JSON.parse(string)[0];
        // 		item.price = item.price.replace(",", ".");
        // 		item.price = item.price.replace(/\s+/g, "");
        // 		if (item.image.length > 0) {
        // 			let picture: IDBImage = JSON.parse(item.image);
        // 			item.picture = picture;
        // 		}
        // 		res.send(item);
        // 	} catch (e) {
        // 		console.log(e);
        // 		res.send(e);
        // 	}
        // });
        // app.delete("/api/items/:id", async (req: Request, res: Response) => {
        // 	try {
        // 		const id: number = ~~req.params.id;
        // 		const authorization = req.header("authorization");
        // 		const decoded = jwt.verify(authorization, tokenKey);
        // 		if (decoded.id && decoded.iat) {
        // 			await pool.execute(
        // 				`
        //                 DELETE FROM items
        //                 WHERE id = '${id}'
        //             `
        // 			);
        // 			res.send({ id: id });
        // 		}
        // 	} catch (e) {
        // 		console.log(e);
        // 		res.send(e);
        // 	}
        // });
        // app.post("/api/items", async (req: Request, res: Response) => {
        // 	try {
        // 		const name: string = req.body.name;
        // 		const price: string = req.body.price;
        // 		const kal: string = req.body.kal;
        // 		const size: string = req.body.kal;
        // 		const rating: string = req.body.rating;
        // 		const description: string = req.body.description;
        // 		const picture: IDBImage = req.body.picture;
        // 		const quantity: number = req.body.quantity;
        // 		const pictureString: string = JSON.stringify(picture);
        // 		const authorization = req.header("authorization");
        // 		const decoded = jwt.verify(authorization, tokenKey);
        // 		if (decoded.id && decoded.iat) {
        // 			const [rows] = await pool.execute(
        // 				`
        //             INSERT INTO items (
        //                 name,
        //                 price,
        //                 kal,
        //                 size,
        //                 rating,
        //                 description,
        //                 quantity,
        //                 picture
        //             )
        //             VALUES (
        //                 '${name}',
        //                 '${price}',
        //                 '${kal}',
        //                 '${size}',
        //                 '${rating}',
        //                 '${description}',
        //                 '${quantity}',
        //                 '${pictureString}'
        //             )
        //         `
        // 			);
        // 			const string = JSON.stringify(rows);
        // 			let item = JSON.parse(string);
        // 			res.send({ id: item.insertId });
        // 		}
        // 	} catch (e) {
        // 		console.log(e);
        // 		res.send(e);
        // 	}
        // });
        app.get("/test", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_a) {
                payload = {
                    message: "OK"
                };
                // res.send("OK")
                res.json(payload);
                return [2 /*return*/];
            });
        }); });
        app.use(express.static(path.resolve(__dirname, "..", "dist")));
        // app.use(express.static(__dirname + "/dist"));
        app.get("*", function (req, res) {
            // res.redirect("/")
            res.sendFile(path.resolve(__dirname, "..", "index.html"));
        });
        app.use(function (error, req, res, next) {
            // console.log("ghjgjhgjhgjhjhgjhgjhgjhgjhgjhgjhgjhg");
            if (error) {
                console.log("Error status: ", error.status);
                console.log("Message: ", error.message);
                res.status(error.status);
                // Отправка ответа
                return res.json({
                    status: error.status,
                    message: error.message,
                    stack: error.stack
                });
            }
            res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
            res.header("Access-Control-Allow-Credentials", "true");
            res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE, PUT");
            res.header("Access-Control-Allow-Headers", "accept, content-type, if-modified-since");
            return next();
        });
        app.listen(port, function () {
            console.log(__dirname); // eslint-disable-line no-console
            console.log("Listening Port " + port); // eslint-disable-line no-console
        });
    }
    catch (e) {
        console.log("err", e.message);
    }
}
exports["default"] = main;
