"use strict";
exports.__esModule = true;
var jwt = require("jsonwebtoken");
var config_1 = require("./../config");
var ClientError_1 = require("./../Errors/ClientError");
var getAuthorizationMW = function () {
    return function (req, res, next) {
        try {
            // const authorization = (req as Request).query._token as string;
            var authorization = req.headers.authorization;
            if (!authorization) {
                console.log("AUTH TOKEN:", authorization);
                throw ClientError_1["default"].notAuthorizated("Wrong token.");
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
