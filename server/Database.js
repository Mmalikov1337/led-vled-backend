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
var mysql = require("mysql2");
var config_1 = require("./config");
var ServerError_1 = require("./Errors/ServerError");
var Database = /** @class */ (function () {
    function Database() {
        try {
            this.pool = mysql
                .createPool({
                host: config_1.urlToConnect,
                user: config_1.s_login,
                database: config_1.dbName,
                password: config_1.s_password
            })
                .promise();
        }
        catch (e) {
            console.log(e);
        }
    }
    Database.prototype.insertOrder = function (basket, name, tel, email, cityAddress, houseNumber, houseOrApartment, postIndex, promo, instagram, comment, deliveryMethod, status) {
        return __awaiter(this, void 0, void 0, function () {
            var rows, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.pool.execute("\n\t\tINSERT INTO orders (\n\t\t\tbasket,\n\t\t\tname,\n\t\t\ttel,\n\t\t\temail,\n\t\t\tcityAddress,\n\t\t\thouseNumber,\n\t\t\thouseOrApartment,\n\t\t\tpostalCode,\n\t\t\tpromo,\n\t\t\tinstagram,\n\t\t\tcomment,\n\t\t\tdeliveryMethod,\n\t\t\tstatus,\n\t\t\tuid,\n\t\t\tdate,\n\t\t\tconfirmation_url\n\t\t)\n\t\tVALUES (\n\t\t\t'" + JSON.stringify(basket) + "',\n\t\t\t'" + name + "',\n\t\t\t'" + tel + "',\n\t\t\t'" + email + "',\n\t\t\t'" + cityAddress + "',\n\t\t\t'" + houseNumber + "',\n\t\t\t'" + houseOrApartment + "',\n\t\t\t'" + postIndex + "',\n\t\t\t'" + promo + "',\n\t\t\t'" + instagram + "',\n\t\t\t'" + comment + "',\n\t\t\t'" + deliveryMethod + "',\n\t\t\t'" + status + "',\n\t\t\t'" + null + "',\n\t\t\t'" + null + "',\n\t\t\t'" + null + "'\n\t\t)\n\t")];
                    case 1:
                        rows = (_a.sent())[0];
                        console.log(typeof rows, rows);
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.log("Database error. insertOrder");
                        throw ServerError_1["default"].internalError("Database error.");
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.getOrders = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var rows, rows, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (!id) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.pool.execute("SELECT * FROM orders WHERE id = ?", [id])];
                    case 1:
                        rows = (_a.sent())[0];
                        return [2 /*return*/, rows];
                    case 2: return [4 /*yield*/, this.pool.execute("SELECT * FROM orders")];
                    case 3:
                        rows = (_a.sent())[0];
                        return [2 /*return*/, rows];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_2 = _a.sent();
                        console.log("Database error. getOrders");
                        throw ServerError_1["default"].internalError("Database error.");
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.editOrders = function (name, tel, email, cityAddress, houseNumber, houseOrApartment, postalCode, promo, instagram, comment, deliveryMethod, status, uid, date, confirmation_url, 
    // totalPrice: string,
    id) {
        return __awaiter(this, void 0, void 0, function () {
            var e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.pool.execute("UPDATE orders SET " +
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
                                id,
                            ])];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _a.sent();
                        console.log("Database error. editOrders", e_3.message, e_3.type);
                        throw ServerError_1["default"].internalError("Database error.");
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.deleteOrders = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var rows, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.pool.execute("DELETE FROM orders	WHERE id = ?", [id])];
                    case 1:
                        rows = (_a.sent())[0];
                        console.log(">>>", rows, rows.affectedRows > 0, "<<<");
                        return [2 /*return*/, rows.affectedRows > 0]; // rows.affectedRows > 0 => true => успешно;
                    case 2:
                        e_4 = _a.sent();
                        throw ServerError_1["default"].internalError("Database error.");
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.getItems = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var rows, rows, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (!id) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.pool.execute("SELECT * FROM items WHERE id = ?", [id])];
                    case 1:
                        rows = (_a.sent())[0];
                        return [2 /*return*/, rows];
                    case 2: return [4 /*yield*/, this.pool.execute("SELECT * FROM items")];
                    case 3:
                        rows = (_a.sent())[0];
                        return [2 /*return*/, rows];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_5 = _a.sent();
                        console.log("Database error. getOrders");
                        throw ServerError_1["default"].internalError("Database error.");
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.executeAny = function (command) {
        return __awaiter(this, void 0, void 0, function () {
            var rows, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.pool.execute(command)];
                    case 1:
                        rows = (_a.sent())[0];
                        return [2 /*return*/, rows];
                    case 2:
                        e_6 = _a.sent();
                        throw ServerError_1["default"].internalError("Database error.");
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Database;
}());
exports["default"] = new Database();
