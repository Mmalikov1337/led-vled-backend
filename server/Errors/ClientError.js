"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var ClientError = /** @class */ (function (_super) {
    __extends(ClientError, _super);
    function ClientError(message, code) {
        var _this = _super.call(this, message) || this;
        _this.code = code;
        return _this;
    }
    ClientError.badRequest = function (message) {
        if (message === void 0) { message = "Bad request."; }
        return new ClientError(message, 400);
    };
    ClientError.notAuthorizated = function (message) {
        if (message === void 0) { message = "Not Authorizated."; }
        return new ClientError(message, 401);
    };
    ClientError.forbidden = function (message) {
        if (message === void 0) { message = "Forbidden."; }
        return new ClientError(message, 403);
    };
    return ClientError;
}(Error));
exports["default"] = ClientError;
