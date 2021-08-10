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
var itemsService_1 = require("./../services/itemsService");
var ClientError_1 = require("./../Errors/ClientError");
var ItemsController = /** @class */ (function () {
    function ItemsController() {
    }
    ItemsController.prototype.getItems = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, total, items, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, itemsService_1["default"].getItems((_a = ~~req.params.id) !== null && _a !== void 0 ? _a : null)];
                    case 1:
                        _b = _c.sent(), total = _b.total, items = _b.items;
                        res.setHeader("X-Total-Count", total.toString());
                        res.setHeader("Access-Control-Expose-Headers", "X-Total-Count");
                        if (req.params.id)
                            //Если только один предмет, то полученный массив надо развернуть
                            return [2 /*return*/, res.send.apply(res, items)];
                        else
                            return [2 /*return*/, res.send(items)];
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _c.sent();
                        next(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ItemsController.prototype.editItems = function (req, res, next) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return __awaiter(this, void 0, void 0, function () {
            var id, name_1, price, kal, size, rating, description, image, quantity, total, e_2;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        _k.trys.push([0, 2, , 3]);
                        id = (_a = ~~req.params.id) !== null && _a !== void 0 ? _a : null;
                        name_1 = (_b = req.body.name) !== null && _b !== void 0 ? _b : null;
                        price = (_c = req.body.price) !== null && _c !== void 0 ? _c : null;
                        kal = (_d = req.body.kal) !== null && _d !== void 0 ? _d : null;
                        size = (_e = req.body.kal) !== null && _e !== void 0 ? _e : null;
                        rating = (_f = req.body.rating) !== null && _f !== void 0 ? _f : null;
                        description = (_g = req.body.description) !== null && _g !== void 0 ? _g : null;
                        image = (_h = req.body.image) !== null && _h !== void 0 ? _h : null;
                        quantity = (_j = req.body.quantity) !== null && _j !== void 0 ? _j : null;
                        // if (decoded.id && decoded.iat) {
                        return [4 /*yield*/, itemsService_1["default"].editItems(name_1, price, kal, size, rating, description, image, quantity, id)];
                    case 1:
                        // if (decoded.id && decoded.iat) {
                        _k.sent();
                        total = 1;
                        // res.setHeader("X-Total-Count", total.toString());
                        // res.setHeader("Access-Control-Expose-Headers", "X-Total-Count");
                        res.status(200);
                        res.json({ id: id });
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _k.sent();
                        console.log(e_2);
                        res.send(e_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ItemsController.prototype.deleteItems = function (req, res, next) {
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
                        return [4 /*yield*/, itemsService_1["default"].deleteItems(id)];
                    case 1:
                        isDeleted = _a.sent();
                        if (!isDeleted) {
                            console.log("Item with id=" + id + " has not deleted.");
                        }
                        res.send({ id: id });
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ItemsController.prototype.createItems = function (req, res, next) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function () {
            var name_2, price, kal, size, rating, description, image, quantity, insertId, e_4;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        _j.trys.push([0, 2, , 3]);
                        name_2 = (_a = req.body.name) !== null && _a !== void 0 ? _a : null;
                        price = (_b = req.body.price) !== null && _b !== void 0 ? _b : null;
                        kal = (_c = req.body.kal) !== null && _c !== void 0 ? _c : null;
                        size = (_d = req.body.kal) !== null && _d !== void 0 ? _d : null;
                        rating = (_e = req.body.rating) !== null && _e !== void 0 ? _e : null;
                        description = (_f = req.body.description) !== null && _f !== void 0 ? _f : null;
                        image = (_g = req.body.image) !== null && _g !== void 0 ? _g : null;
                        quantity = (_h = req.body.quantity) !== null && _h !== void 0 ? _h : null;
                        // const parsedImage = JSON
                        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>!!!", image, JSON.parse(JSON.stringify(image)));
                        return [4 /*yield*/, itemsService_1["default"].createItems(name_2, price, kal, size, rating, description, image, quantity)];
                    case 1:
                        insertId = _j.sent();
                        console.log("insertId", insertId);
                        res.send({ id: insertId });
                        return [3 /*break*/, 3];
                    case 2:
                        e_4 = _j.sent();
                        console.log(e_4);
                        res.send(e_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ItemsController;
}());
exports["default"] = new ItemsController();
