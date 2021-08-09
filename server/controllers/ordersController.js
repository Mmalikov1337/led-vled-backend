"use strict";
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
var ordersService_1 = require("./../services/ordersService");
var ClientError_1 = require("./../Errors/ClientError");
var OrdersController = /** @class */ (function () {
    function OrdersController() {
    }
    OrdersController.prototype.createOrder = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var basket, name_1, tel, email, cityAddress, houseNumber, houseOrApartment, postIndex, promo, instagram, comment, deliveryMethod, paymentMethod;
            return __generator(this, function (_a) {
                try {
                    basket = req.body.basket;
                    name_1 = req.body.orderData.name;
                    tel = req.body.orderData.tel;
                    email = req.body.orderData.email;
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
                        throw ClientError_1["default"].badRequest("basket not found");
                    if (!name_1)
                        throw ClientError_1["default"].badRequest("name not found");
                    if (!tel)
                        throw ClientError_1["default"].badRequest("tel number not fou");
                    if (!email)
                        throw ClientError_1["default"].badRequest("email not found");
                    if (!cityAddress)
                        throw ClientError_1["default"].badRequest("cityAddress not found");
                    if (!houseNumber)
                        throw ClientError_1["default"].badRequest("houseNumber not found");
                    if (houseOrApartment === null)
                        throw ClientError_1["default"].badRequest("houseOrApartment not found");
                    if (!postIndex)
                        throw ClientError_1["default"].badRequest("postalCode not found");
                    if (!deliveryMethod)
                        throw ClientError_1["default"].badRequest("deliveryMethod not found");
                    ordersService_1["default"].createOrder(basket, name_1, tel, email, cityAddress, houseNumber, houseOrApartment, postIndex, promo, instagram, comment, deliveryMethod, paymentMethod);
                    res.status(201);
                    return [2 /*return*/, res.json({
                            message: "OK"
                        })];
                }
                catch (e) {
                    // console.log(e);
                    next(e);
                }
                return [2 /*return*/];
            });
        });
    };
    OrdersController.prototype.getOrders = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, total, orders, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, ordersService_1["default"].getOrders(req.query, (_a = ~~req.params.id) !== null && _a !== void 0 ? _a : null)];
                    case 1:
                        _b = _c.sent(), total = _b.total, orders = _b.orders;
                        res.setHeader("X-Total-Count", total.toString());
                        res.setHeader("Access-Control-Expose-Headers", "X-Total-Count");
                        if (req.params.id)
                            //Если только один заказ, то полученный массив надо развернуть
                            return [2 /*return*/, res.send.apply(res, orders)];
                        else
                            return [2 /*return*/, res.send(orders)];
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _c.sent();
                        // console.log(e);
                        next(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersController.prototype.editOrders = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, name_2, tel, email, cityAddress, houseNumber, houseOrApartment, postalCode, promo, instagram, comment, deliveryMethod, status_1, uid, date, confirmation_url, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = ~~req.params.id;
                        name_2 = req.body.name;
                        tel = req.body.tel;
                        email = req.body.email;
                        cityAddress = req.body.cityAddress;
                        houseNumber = req.body.houseNumber;
                        houseOrApartment = req.body.houseOrApartment;
                        postalCode = req.body.postalCode;
                        promo = req.body.promo;
                        instagram = req.body.instagram;
                        comment = req.body.comment;
                        deliveryMethod = req.body.deliveryMethod;
                        status_1 = req.body.status;
                        uid = req.body.uid;
                        date = new Date(req.body.date);
                        confirmation_url = req.body.confirmation_url;
                        // const totalPrice: string = req.body.totalPrice;
                        return [4 /*yield*/, ordersService_1["default"].editOrders(name_2, tel, email, cityAddress, houseNumber, houseOrApartment, postalCode, promo, instagram, comment, deliveryMethod, status_1, uid, date, confirmation_url, id)];
                    case 1:
                        // const totalPrice: string = req.body.totalPrice;
                        _a.sent();
                        res.status(200);
                        return [2 /*return*/, res.send({ id: id })];
                    case 2:
                        e_2 = _a.sent();
                        console.log(e_2);
                        res.send(e_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersController.prototype.deleteOrders = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, isDeleted, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = ~~req.params.id;
                        if (!id) {
                            throw ClientError_1["default"].badRequest("Wrong id");
                        }
                        return [4 /*yield*/, ordersService_1["default"].deleteOrders(id)];
                    case 1:
                        isDeleted = _a.sent();
                        if (!isDeleted) {
                            console.log("Order with id=" + id + " has not deleted.");
                        }
                        res.send({ id: id });
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _a.sent();
                        console.log(e_3);
                        res.send(e_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return OrdersController;
}());
exports["default"] = new OrdersController();
