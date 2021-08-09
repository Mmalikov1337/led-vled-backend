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
var ClientError_1 = require("./../Errors/ClientError");
var Database_1 = require("./../Database");
var OrdersService = /** @class */ (function () {
    function OrdersService() {
    }
    OrdersService.prototype.createOrder = function (basket, name, tel, email, cityAddress, houseNumber, houseOrApartment, postIndex, promo, instagram, comment, deliveryMethod, paymentMethod) {
        return __awaiter(this, void 0, void 0, function () {
            var status_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(paymentMethod === "raif")) return [3 /*break*/, 1];
                        return [3 /*break*/, 5];
                    case 1:
                        if (!(paymentMethod === "sber")) return [3 /*break*/, 2];
                        return [3 /*break*/, 5];
                    case 2:
                        if (!(paymentMethod === "on_receiving")) return [3 /*break*/, 4];
                        status_1 = "delivered";
                        return [4 /*yield*/, Database_1["default"].insertOrder(basket, name, tel, email, cityAddress, houseNumber, houseOrApartment, postIndex, promo, instagram, comment, deliveryMethod, status_1)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        console.log("Invalid payment method");
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    OrdersService.prototype.getOrders = function (query, id) {
        return __awaiter(this, void 0, void 0, function () {
            var dbItems, dbOrders, orders, total, slicedOrders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Database_1["default"].getItems()];
                    case 1:
                        dbItems = _a.sent();
                        return [4 /*yield*/, Database_1["default"].getOrders(id !== null && id !== void 0 ? id : null)];
                    case 2:
                        dbOrders = _a.sent();
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
                        orders.forEach(function (it) {
                            //Рассчет поля TotalPrice(суммарная стоимость заказа) для каждого заказа исходя из данных, переданных в backet
                            it.basket.forEach(function (i) {
                                var itemId = i.id;
                                var itemQuantity = i.quantity;
                                var item = dbItems.find(function (i) { return i.id === itemId; });
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
                        if (query.date_gte) {
                            //Фильтр "После даты"
                            try {
                                orders = orders.filter(function (it) {
                                    return new Date(it.date) >= new Date(query.date_gte);
                                });
                            }
                            catch (e) {
                                console.log("Filter error date_gte.", e.message, e.type);
                            }
                        }
                        if (query.date_lte) {
                            //Фильтр "До даты"
                            try {
                                orders = orders.filter(function (it) {
                                    return new Date(it.date) <= new Date(query.date_lte);
                                });
                            }
                            catch (e) {
                                console.log("Filter error date_lte.", e.message, e.type);
                            }
                        }
                        if (query.price_gte) {
                            //Фильтр "Стоимость больше чем"
                            try {
                                orders = orders.filter(function (it) {
                                    return it.totalPrice >= ~~query.price_gte;
                                });
                            }
                            catch (e) {
                                console.log("Filter error price_gte.", e.message, e.type);
                            }
                        }
                        if (query.price_lte) {
                            //Фильтр "Стоимость меньше чем"
                            try {
                                orders = orders.filter(function (it) {
                                    return it.totalPrice <= ~~query.price_lte;
                                });
                            }
                            catch (e) {
                                console.log("Filter error price_lte.", e.message, e.type);
                            }
                        }
                        if (query.status) {
                            //Фильтр "Статус заказа"
                            try {
                                orders = orders.filter(function (it) {
                                    if (query.status instanceof Array) {
                                        return query.status.includes(it.status);
                                    }
                                    else {
                                        return query.status == it.status;
                                    }
                                });
                            }
                            catch (e) {
                                console.log("Filter error status.", e.message, e.type);
                            }
                        }
                        if (query.search_city) {
                            //Фильтр "Поиск по городу"
                            try {
                                orders = orders.filter(function (it) {
                                    return it.cityAddress.toLowerCase().includes(query.search_city.toLowerCase());
                                });
                            }
                            catch (e) {
                                console.log("Filter error search_city.", e.message, e.type);
                            }
                        }
                        if (query.search_name) {
                            //Фильтр "Поиск по имени"
                            try {
                                orders = orders.filter(function (it) {
                                    return it.name.toLowerCase().includes(query.search_name.toLowerCase());
                                });
                            }
                            catch (e) {
                                console.log("Filter error search_name.", e.message, e.type);
                            }
                        }
                        if (query.search_promo) {
                            //Фильтр "Поиск по промокоду"
                            try {
                                orders = orders.filter(function (it) {
                                    return it.promo.toLowerCase().includes(query.search_promo.toLowerCase());
                                });
                            }
                            catch (e) {
                                console.log("Filter error search_promo.", e.message, e.type);
                            }
                        }
                        if (query.search_id) {
                            //Фильтр "Поиск по id"
                            try {
                                orders = orders.filter(function (it) {
                                    return it.id.toString().toLowerCase() == query.search_id.toLowerCase();
                                });
                            }
                            catch (e) {
                                console.log("Filter error search_id.", e.message, e.type);
                            }
                        }
                        slicedOrders = query._start || query._end ? orders.slice(~~query._start, ~~query._end) : orders;
                        if (query._sort && query._order) {
                            if (query._sort == "date") {
                                if (query._order == "ASC") {
                                    slicedOrders.sort(function (a, b) {
                                        //возр
                                        var da = new Date(a.date).getTime();
                                        var db = new Date(b.date).getTime();
                                        return da > db ? 1 : -1;
                                    });
                                }
                                else {
                                    slicedOrders.sort(function (a, b) {
                                        var da = new Date(a.date).getTime();
                                        var db = new Date(b.date).getTime();
                                        return da > db ? 0 : 1;
                                    });
                                }
                            }
                        }
                        return [2 /*return*/, {
                                total: total,
                                orders: slicedOrders
                            }];
                }
            });
        });
    };
    OrdersService.prototype.editOrders = function (name, tel, email, cityAddress, houseNumber, houseOrApartment, postalCode, promo, instagram, comment, deliveryMethod, status, uid, date, confirmation_url, 
    // totalPrice: string,
    id) {
        return __awaiter(this, void 0, void 0, function () {
            var dbOrders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Database_1["default"].getOrders(id)];
                    case 1:
                        dbOrders = _a.sent();
                        if (!dbOrders[0].id) {
                            throw ClientError_1["default"].badRequest("Order with id=" + id + " not found");
                        }
                        return [4 /*yield*/, Database_1["default"].editOrders(name, tel, email, cityAddress, houseNumber, houseOrApartment, postalCode, promo, instagram, comment, deliveryMethod, status, uid, date, confirmation_url, id)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return OrdersService;
}());
exports["default"] = new OrdersService();
