"use strict";
exports.__esModule = true;
var auth_1 = require("./routers/auth");
var items_1 = require("./routers/items");
var orders_1 = require("./routers/orders");
var express = require("express");
var cors = require("cors");
var path = require("path");
var app = express();
var port = process.env.PORT || 3001;
function main() {
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
        app.use("/api/auth", auth_1["default"]);
        app.use(express.static(path.resolve(__dirname, "..", "dist")));
        app.get("*", function (req, res) {
            res.sendFile(path.resolve(__dirname, "..", "index.html"));
        });
        app.use(function (error, req, res, next) {
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
            console.log(__dirname);
            console.log("Listening Port " + port);
        });
    }
    catch (e) {
        console.log("err", e.message);
    }
}
exports["default"] = main;
