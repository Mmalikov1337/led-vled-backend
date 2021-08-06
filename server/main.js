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
var port = process.env.PORT || 25565;
var tokenKey = crypto2.randomBytes(256).toString("base64");
var saltRounds = 12;
var myPlaintextPassword = "admin";
bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
        // console.log(hash);
    });
});
function main() {
    var _this = this;
    try {
        var s = process.env.CLEARDB_DATABASE_URL;
        var s_proto = s ? s.substring(8) : " ";
        var s_login = s ? s_proto.substring(0, s_proto.indexOf(":")) : " ";
        var s_password = s ? s_proto.substring(s_proto.indexOf(":") + 1, s_proto.indexOf("@")) : " ";
        var url = s ? s_proto.split("@")[1] : " ";
        var urlToConnect = s ? url.substring(0, url.indexOf("/")) : " ";
        var dbName = s ? url.substring(url.indexOf("/") + 1, url.indexOf("?")) : " ";
        var pool_1 = mysql
            .createPool({
            host: process.env.CLEARDB_DATABASE_URL ? urlToConnect : "eu-cdbr-west-01.cleardb.com",
            user: process.env.CLEARDB_DATABASE_URL ? s_login : "b590467e576f58",
            database: process.env.CLEARDB_DATABASE_URL ? dbName : "heroku_0772a32464d9340",
            password: process.env.CLEARDB_DATABASE_URL ? s_password : "b84b016b"
        })
            .promise();
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(cors());
        app.post("/api/orders", function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var basket, name_1, tel, email_1, cityAddress, houseNumber, houseOrApartment, postIndex, promo, instagram, comment, deliveryMethod, paymentMethod, status_1, rows, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        console.log("req.body", req.body);
                        basket = req.body.basket;
                        name_1 = req.body.orderData.name;
                        tel = req.body.orderData.tel;
                        email_1 = req.body.orderData.email;
                        cityAddress = req.body.orderData.cityAddress;
                        houseNumber = req.body.orderData.houseNumber;
                        houseOrApartment = req.body.orderData.houseOrApartment;
                        postIndex = req.body.orderData.postIndex;
                        promo = req.body.orderData.promo;
                        instagram = req.body.orderData.instagram;
                        comment = req.body.orderData.comment;
                        deliveryMethod = req.body.deliveryData.method;
                        paymentMethod = req.body.paymentData.method;
                        if (!basket)
                            throw createError(400, "basket not found");
                        if (!name_1)
                            throw createError(400, "name not found");
                        if (!tel)
                            throw createError(400, "tel number not found");
                        if (!email_1)
                            throw createError(400, "email not found");
                        if (!cityAddress)
                            throw createError(400, "cityAddress not found");
                        if (!houseNumber)
                            throw createError(400, "houseNumber not found");
                        if (houseOrApartment === null)
                            throw createError(400, "houseOrApartment not found");
                        if (!postIndex)
                            throw createError(400, "postalCode not found");
                        if (!deliveryMethod)
                            throw createError(400, "deliveryMethod not found");
                        if (!(paymentMethod === "raif")) return [3 /*break*/, 1];
                        return [3 /*break*/, 5];
                    case 1:
                        if (!(paymentMethod === "sber")) return [3 /*break*/, 2];
                        return [3 /*break*/, 5];
                    case 2:
                        if (!(paymentMethod === "on_receiving")) return [3 /*break*/, 4];
                        status_1 = "delivered";
                        return [4 /*yield*/, pool_1.execute("\n                INSERT INTO orders (\n                    basket,\n                    name,\n                    tel,\n                    email,\n                    cityAddress,\n                    houseNumber,\n                    houseOrApartment,\n                    postalCode,\n                    promo,\n                    instagram,\n                    comment,\n                    deliveryMethod,\n                    status,\n                    uid,\n                    date,\n                    confirmation_url\n                )\n                VALUES (\n                    '" + JSON.stringify(basket) + "',\n                    '" + name_1 + "',\n                    '" + tel + "',\n                    '" + email_1 + "',\n                    '" + cityAddress + "',\n                    '" + houseNumber + "',\n                    '" + houseOrApartment + "',\n                    '" + postIndex + "',\n                    '" + promo + "',\n                    '" + instagram + "',\n                    '" + comment + "',\n                    '" + deliveryMethod + "',\n                    '" + status_1 + "',\n                    '" + null + "',\n                    '" + null + "',\n                    '" + null + "'\n                )\n            ")];
                    case 3:
                        rows = (_a.sent())[0];
                        res.status(201);
                        return [2 /*return*/, res.json({
                                message: "OK"
                            })];
                    case 4:
                        console.log("Invalid payment method");
                        throw createError(400, "Payment method '" + paymentMethod + "' not found");
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        e_1 = _a.sent();
                        // console.log(e);
                        next(e_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); });
        app.post("/updateOrder", function (req, res, next) {
            var info = req.body;
            console.log(info);
            res.status(200).send("OK");
        });
        app.get("/api/orders", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var authorization, decoded, dbOrders, dbItems_1, orders, total, slicedOrders, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        authorization = req.query._token;
                        decoded = jwt.verify(authorization, tokenKey);
                        if (!decoded)
                            return [2 /*return*/];
                        console.log("app.get(\"/api/orders\"", req.path, req.query, req.params);
                        return [4 /*yield*/, pool_1.execute("SELECT * FROM orders")];
                    case 1:
                        dbOrders = (_a.sent())[0];
                        return [4 /*yield*/, pool_1.execute("SELECT * FROM items")];
                    case 2:
                        dbItems_1 = (_a.sent())[0];
                        orders = dbOrders.map(function (it, index) {
                            //Преобразование bucket из строки в массив
                            if (it.basket) {
                                try {
                                    it.basket = JSON.parse(it.basket);
                                }
                                catch (e) {
                                    console.log("Failed to parse backet", it, index, e.message, e.type);
                                }
                            }
                            return it;
                        });
                        total = orders.length;
                        res.setHeader("X-Total-Count", total.toString());
                        res.setHeader("Access-Control-Expose-Headers", "X-Total-Count");
                        orders.forEach(function (it) {
                            //Рассчет поля TotalPrice(суммарная стоимость заказа) для каждого заказа исходя из данных, переданных в backet
                            it.basket.forEach(function (i) {
                                var itemId = i.id;
                                var itemQuantity = i.quantity;
                                var item = dbItems_1.find(function (i) { return i.id === itemId; });
                                if (!item) {
                                    console.log("Cant find item with id=" + itemId, itemId);
                                    return;
                                }
                                var itemPrice = parseFloat(item.price);
                                if (!itemPrice) {
                                    console.log("Cant parse item with price=" + itemPrice, item.price);
                                    return;
                                }
                                if (!itemQuantity) {
                                    console.log("Backet dont have quantity, value=" + itemQuantity);
                                    return;
                                }
                                if (!item.name) {
                                    console.log("Name not found, value=" + item.name);
                                    return;
                                }
                                var orderPrice = itemPrice * itemQuantity;
                                if (!it.totalPrice) {
                                    it.totalPrice = 0;
                                }
                                it.totalPrice += orderPrice;
                            });
                        });
                        if (req.query.date_gte) {
                            //Фильтр "После даты"
                            try {
                                orders = orders.filter(function (it) {
                                    return new Date(it.date) >= new Date(req.query.date_gte);
                                });
                            }
                            catch (e) {
                                console.log("Filter error date_gte.", e.message, e.type);
                            }
                        }
                        if (req.query.date_lte) {
                            //Фильтр "До даты"
                            try {
                                orders = orders.filter(function (it) {
                                    return new Date(it.date) <= new Date(req.query.date_lte);
                                });
                            }
                            catch (e) {
                                console.log("Filter error date_lte.", e.message, e.type);
                            }
                        }
                        if (req.query.price_gte) {
                            //Фильтр "Стоимость больше чем"
                            try {
                                orders = orders.filter(function (it) {
                                    return it.totalPrice >= ~~req.query.price_gte;
                                });
                            }
                            catch (e) {
                                console.log("Filter error price_gte.", e.message, e.type);
                            }
                        }
                        if (req.query.price_lte) {
                            //Фильтр "Стоимость меньше чем"
                            try {
                                orders = orders.filter(function (it) {
                                    return it.totalPrice <= ~~req.query.price_lte;
                                });
                            }
                            catch (e) {
                                console.log("Filter error price_lte.", e.message, e.type);
                            }
                        }
                        if (req.query.status) {
                            //Фильтр "Статус заказа"
                            try {
                                orders = orders.filter(function (it) {
                                    // console.log(">>>>>>>>>>>>>>>>",req.query.status, typeof req.query.status , req.query.status instanceof Array)
                                    if (req.query.status instanceof Array) {
                                        // console.log(">>>>>>>>>>>>>>>1",(req.query.status as Array<string>).includes(it.status));
                                        return req.query.status.includes(it.status);
                                    }
                                    else {
                                        // console.log(">>>>>>>>>>>>>>>2",req.query.status == it.status,req.query.status,it.status);
                                        return req.query.status == it.status;
                                    }
                                });
                            }
                            catch (e) {
                                console.log("Filter error status.", e.message, e.type);
                            }
                        }
                        if (req.query.search_city) {
                            //Фильтр "Поиск по городу"
                            try {
                                // orders = orders.filter((it) => {
                                // 	return it.cityAddress.toLowerCase() == (req.query.search_city as string).toLowerCase();
                                // });
                                orders = orders.filter(function (it) {
                                    return it.cityAddress.toLowerCase().includes(req.query.search_city.toLowerCase());
                                });
                            }
                            catch (e) {
                                console.log("Filter error search_city.", e.message, e.type);
                            }
                        }
                        if (req.query.search_name) {
                            //Фильтр "Поиск по имени"
                            try {
                                orders = orders.filter(function (it) {
                                    return it.name.toLowerCase().includes(req.query.search_name.toLowerCase());
                                });
                            }
                            catch (e) {
                                console.log("Filter error search_name.", e.message, e.type);
                            }
                        }
                        if (req.query.search_promo) {
                            //Фильтр "Поиск по промокоду"
                            try {
                                orders = orders.filter(function (it) {
                                    return it.promo.toLowerCase().includes(req.query.search_promo.toLowerCase());
                                });
                            }
                            catch (e) {
                                console.log("Filter error search_promo.", e.message, e.type);
                            }
                        }
                        if (req.query.search_id) {
                            //Фильтр "Поиск по id"
                            try {
                                orders = orders.filter(function (it) {
                                    return it.id.toString().toLowerCase() == req.query.search_id.toLowerCase();
                                });
                            }
                            catch (e) {
                                console.log("Filter error search_id.", e.message, e.type);
                            }
                        }
                        slicedOrders = orders.slice(~~req.query._start, ~~req.query._end);
                        if (req.query._sort && req.query._order) {
                            if (req.query._sort == "date") {
                                if (req.query._order == "ASC") {
                                    console.log("sort 1");
                                    slicedOrders.sort(function (a, b) {
                                        //возр
                                        var da = new Date(a.date).getTime();
                                        var db = new Date(b.date).getTime();
                                        return da > db ? 1 : -1;
                                    });
                                }
                                else {
                                    console.log("sort 2");
                                    slicedOrders.sort(function (a, b) {
                                        var da = new Date(a.date).getTime();
                                        var db = new Date(b.date).getTime();
                                        return da > db ? 0 : 1;
                                    });
                                }
                            }
                        }
                        return [2 /*return*/, res.send(slicedOrders)];
                    case 3:
                        e_2 = _a.sent();
                        res.setHeader("X-Total-Count", 0);
                        res.setHeader("Access-Control-Expose-Headers", "X-Total-Count");
                        console.log(e_2);
                        res.send(e_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        app.get("/api/orders/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var dbOrders, dbItems_2, order_1, total, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        console.log("app.get(\"/api/orders/id\"", req.path, req.query, req.params);
                        return [4 /*yield*/, pool_1.execute("SELECT * FROM orders WHERE id = ?", [req.params.id])];
                    case 1:
                        dbOrders = (_a.sent())[0];
                        return [4 /*yield*/, pool_1.execute("SELECT * FROM items")];
                    case 2:
                        dbItems_2 = (_a.sent())[0];
                        order_1 = dbOrders.map(function (it, index) {
                            //Преобразование bucket из строки в массив
                            if (it.basket) {
                                try {
                                    it.basket = JSON.parse(it.basket);
                                }
                                catch (e) {
                                    console.log("Failed to parse backet", it, index, e.message, e.type);
                                }
                            }
                            return it;
                        })[0];
                        //Рассчет поля TotalPrice(суммарная стоимость заказа) для каждого заказа исходя из данных, переданных в backet
                        order_1.basket.forEach(function (i) {
                            var _a;
                            var itemId = i.id;
                            var itemQuantity = i.quantity;
                            var item = dbItems_2.find(function (i) { return i.id === itemId; });
                            if (!item) {
                                console.log("Cant find item with id=" + itemId, itemId);
                                return;
                            }
                            var itemPrice = parseFloat(item.price);
                            if (!itemPrice) {
                                console.log("Cant parse item with price=" + itemPrice, item.price);
                                return;
                            }
                            if (!itemQuantity) {
                                console.log("Backet dont have quantity, value=" + itemQuantity);
                                return;
                            }
                            if (!item.name) {
                                console.log("Name not found, value=" + item.name);
                                return;
                            }
                            var orderPrice = itemPrice * itemQuantity;
                            if (!order_1.totalPrice) {
                                order_1.totalPrice = 0;
                            }
                            i.name = (_a = item.name) !== null && _a !== void 0 ? _a : "NO NAME";
                            order_1.totalPrice += orderPrice;
                        });
                        total = 1;
                        res.setHeader("X-Total-Count", total.toString());
                        res.setHeader("Access-Control-Expose-Headers", "X-Total-Count");
                        res.send(order_1);
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        console.log(e_3);
                        res.send(e_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        app.put("/api/orders/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var authorization, decoded, id, name_2, tel, email_2, cityAddress, houseNumber, houseOrApartment, postalCode, promo, instagram, comment, deliveryMethod, status_2, uid, date, confirmation_url, totalPrice, dbOrders, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        console.log("/api/orders/:id", req.params, req.body);
                        authorization = req.header("authorization");
                        decoded = jwt.verify(authorization, tokenKey);
                        id = ~~req.params.id;
                        name_2 = req.body.name;
                        tel = req.body.tel;
                        email_2 = req.body.email;
                        cityAddress = req.body.cityAddress;
                        houseNumber = req.body.houseNumber;
                        houseOrApartment = req.body.houseOrApartment;
                        postalCode = req.body.postalCode;
                        promo = req.body.promo;
                        instagram = req.body.instagram;
                        comment = req.body.comment;
                        deliveryMethod = req.body.deliveryMethod;
                        status_2 = req.body.status;
                        uid = req.body.uid;
                        date = new Date(req.body.date);
                        confirmation_url = req.body.confirmation_url;
                        totalPrice = req.body.totalPrice;
                        return [4 /*yield*/, pool_1.execute("SELECT id FROM orders WHERE id = ?", [
                                req.params.id,
                            ])];
                    case 1:
                        dbOrders = (_a.sent())[0];
                        if (!dbOrders[0].id) {
                            console.log("Order with id=" + id + " not found");
                            res.status(404);
                            return [2 /*return*/, res.send({ message: "Order with id=" + id + " not found" })];
                        }
                        return [4 /*yield*/, pool_1.execute("UPDATE orders SET " +
                                "name = ? , " +
                                "tel = ? , " +
                                "email = ? , " +
                                "cityAddress = ? , " +
                                "houseNumber = ? , " +
                                "houseOrApartment = ? , " +
                                "postalCode = ? , " +
                                "promo = ? , " +
                                "instagram = ? , " +
                                "comment = ? , " +
                                "deliveryMethod = ? , " +
                                "status = ? , " +
                                "uid = ? , " +
                                "date = ? , " +
                                "confirmation_url = ? " +
                                "WHERE id = ?", [
                                name_2,
                                tel,
                                email_2,
                                cityAddress,
                                houseNumber,
                                houseOrApartment,
                                postalCode,
                                promo,
                                instagram,
                                comment,
                                deliveryMethod,
                                status_2,
                                uid,
                                date,
                                confirmation_url,
                                id,
                            ])];
                    case 2:
                        _a.sent();
                        res.status(200);
                        return [2 /*return*/, res.send({ id: id })];
                    case 3:
                        e_4 = _a.sent();
                        console.log(e_4);
                        res.send(e_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        app["delete"]("/api/orders/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, authorization, decoded, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        id = req.params.id;
                        authorization = req.header("authorization");
                        decoded = jwt.verify(authorization, tokenKey);
                        if (!(decoded.id && decoded.iat)) return [3 /*break*/, 2];
                        return [4 /*yield*/, pool_1.execute("\n                    DELETE FROM orders\n                    WHERE id = '" + id + "'\n                ")];
                    case 1:
                        _a.sent();
                        res.send({ id: id });
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        e_5 = _a.sent();
                        console.log(e_5);
                        res.send(e_5);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        app.get("/api/items", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var rows, string, items, total, slicer, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, pool_1.execute("SELECT * FROM items")];
                    case 1:
                        rows = (_a.sent())[0];
                        string = JSON.stringify(rows);
                        items = JSON.parse(string);
                        if (req.query.name) {
                            items = items.filter(function (e) {
                                return e.name.toLowerCase().includes(req.query.name.toLowerCase());
                            });
                        }
                        total = items.length;
                        res.set("X-Total-Count", total.toString());
                        res.header("Access-Control-Expose-Headers", "X-Total-Count");
                        slicer = items.slice(~~req.query._start, ~~req.query._end);
                        slicer = slicer.map(function (item) {
                            if (item.image.length > 0) {
                                var picture = JSON.parse(item.image);
                                item.picture = picture;
                            }
                            item.price = item.price.replace(",", ".");
                            item.price = item.price.replace(/\s+/g, "");
                            return item;
                        });
                        if (req.query.priceSort) {
                            slicer = slicer.sort(function (a, b) {
                                return req.query.priceSort == "decrease"
                                    ? Number(b.price) - Number(a.price)
                                    : Number(a.price) - Number(b.price);
                            });
                        }
                        res.send(slicer);
                        return [3 /*break*/, 3];
                    case 2:
                        e_6 = _a.sent();
                        console.log(e_6);
                        res.send(e_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        app.put("/api/items/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, name_3, price, kal, size, rating, description, picture, quantity, pictureString, authorization, decoded, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        console.log("/api/items/:id PUT", req.params, req.body);
                        id = ~~req.params.id;
                        name_3 = req.body.name;
                        price = req.body.price;
                        kal = req.body.kal;
                        size = req.body.kal;
                        rating = req.body.rating;
                        description = req.body.description;
                        picture = req.body.picture;
                        quantity = req.body.quantity;
                        pictureString = JSON.stringify(picture);
                        authorization = req.header("authorization");
                        decoded = jwt.verify(authorization, tokenKey);
                        if (!(decoded.id && decoded.iat)) return [3 /*break*/, 2];
                        return [4 /*yield*/, pool_1.execute("\n                    UPDATE items SET\n                        name = '" + name_3 + "',\n                        price = '" + price + "',\n                        kal = '" + kal + "',\n                        size = '" + size + "',\n                        rating = '" + rating + "',\n                        description = '" + description + "',\n                        quantity = '" + quantity + "',\n                        image = '" + pictureString + "'\n                    WHERE id = '" + id + "'\n                ")];
                    case 1:
                        _a.sent();
                        res.send({ id: id });
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        e_7 = _a.sent();
                        console.log(e_7);
                        res.send(e_7);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        app.post("/api/authenticate", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var rows, string, admin, access, e_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, pool_1.execute("SELECT * FROM admins WHERE username = '" + req.body.username + "'")];
                    case 1:
                        rows = (_a.sent())[0];
                        string = JSON.stringify(rows);
                        admin = JSON.parse(string)[0];
                        if (!admin) return [3 /*break*/, 3];
                        return [4 /*yield*/, bcrypt.compare(req.body.password, admin.password)];
                    case 2:
                        access = _a.sent();
                        if (req.body.username === admin.username && access) {
                            return [2 /*return*/, res.status(200).json({
                                    id: admin.id,
                                    login: admin.username,
                                    token: jwt.sign({ id: admin.id }, tokenKey, { expiresIn: "1h" })
                                })];
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/, res.status(404).json({ message: "Неправильный логин / пароль" })];
                    case 4:
                        e_8 = _a.sent();
                        console.log(e_8);
                        res.send(e_8);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        app.post("/api/checkAuth", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    jwt.verify(req.body.token, tokenKey, function (err, decoded) {
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
        app.get("/api/items/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var rows, string, item, picture, e_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, pool_1.execute("SELECT * FROM items WHERE id = " + req.params.id)];
                    case 1:
                        rows = (_a.sent())[0];
                        string = JSON.stringify(rows);
                        item = JSON.parse(string)[0];
                        item.price = item.price.replace(",", ".");
                        item.price = item.price.replace(/\s+/g, "");
                        if (item.image.length > 0) {
                            picture = JSON.parse(item.image);
                            item.picture = picture;
                        }
                        res.send(item);
                        return [3 /*break*/, 3];
                    case 2:
                        e_9 = _a.sent();
                        console.log(e_9);
                        res.send(e_9);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        app["delete"]("/api/items/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, authorization, decoded, e_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        id = ~~req.params.id;
                        authorization = req.header("authorization");
                        decoded = jwt.verify(authorization, tokenKey);
                        if (!(decoded.id && decoded.iat)) return [3 /*break*/, 2];
                        return [4 /*yield*/, pool_1.execute("\n                    DELETE FROM items\n                    WHERE id = '" + id + "'\n                ")];
                    case 1:
                        _a.sent();
                        res.send({ id: id });
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        e_10 = _a.sent();
                        console.log(e_10);
                        res.send(e_10);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        app.post("/api/items", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var name_4, price, kal, size, rating, description, picture, quantity, pictureString, authorization, decoded, rows, string, item, e_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        name_4 = req.body.name;
                        price = req.body.price;
                        kal = req.body.kal;
                        size = req.body.kal;
                        rating = req.body.rating;
                        description = req.body.description;
                        picture = req.body.picture;
                        quantity = req.body.quantity;
                        pictureString = JSON.stringify(picture);
                        authorization = req.header("authorization");
                        decoded = jwt.verify(authorization, tokenKey);
                        if (!(decoded.id && decoded.iat)) return [3 /*break*/, 2];
                        return [4 /*yield*/, pool_1.execute("\n                INSERT INTO items (\n                    name,\n                    price,\n                    kal,\n                    size,\n                    rating,\n                    description,\n                    quantity,\n                    picture\n                )\n                VALUES (\n                    '" + name_4 + "',\n                    '" + price + "',\n                    '" + kal + "',\n                    '" + size + "',\n                    '" + rating + "',\n                    '" + description + "',\n                    '" + quantity + "',\n                    '" + pictureString + "'\n                )\n            ")];
                    case 1:
                        rows = (_a.sent())[0];
                        string = JSON.stringify(rows);
                        item = JSON.parse(string);
                        res.send({ id: item.insertId });
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        e_11 = _a.sent();
                        console.log(e_11);
                        res.send(e_11);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
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
