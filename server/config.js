"use strict";
exports.__esModule = true;
exports.dbName = exports.urlToConnect = exports.s_password = exports.s_login = exports.tokenKey = void 0;
var crypto2 = require("crypto");
var gmail = {
    email: "god.nota.tl@gmail.com",
    password: "goldik12"
};
var port = process.env.PORT || 3001;
exports.tokenKey = crypto2.randomBytes(256).toString("base64");
var saltRounds = 12;
var myPlaintextPassword = "admin";
/* DB */
var s = process.env.CLEARDB_DATABASE_URL;
var s_proto = s ? s.substring(8) : " ";
exports.s_login = s ? s_proto.substring(0, s_proto.indexOf(":")) : "b590467e576f58";
exports.s_password = s
    ? s_proto.substring(s_proto.indexOf(":") + 1, s_proto.indexOf("@"))
    : "b84b016b";
var url = s ? s_proto.split("@")[1] : " ";
exports.urlToConnect = s ? url.substring(0, url.indexOf("/")) : "eu-cdbr-west-01.cleardb.com";
exports.dbName = s
    ? url.substring(url.indexOf("/") + 1, url.indexOf("?"))
    : "heroku_0772a32464d9340";
/* DB */
