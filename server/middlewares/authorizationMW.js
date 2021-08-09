"use strict";
exports.__esModule = true;
var jwt = require("jsonwebtoken");
var config_1 = require("./../config");
var ClientError_1 = require("./../Errors/ClientError");
var getAuthorizationMW = function () {
    return function (req, res, next) {
        try {
            var authorization = req.query._token;
            if (!authorization) {
                ClientError_1["default"].notAuthorizated("Wrong token.");
            }
            var decoded = jwt.verify(authorization, config_1.tokenKey);
            if (!decoded)
                return;
            req.tokenData = decoded;
            return next();
        }
        catch (e) {
            next(e);
        }
    };
};
exports["default"] = getAuthorizationMW;
