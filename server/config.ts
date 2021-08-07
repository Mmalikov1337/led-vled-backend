const crypto2 = require("crypto");

const gmail = {
	email: "god.nota.tl@gmail.com",
	password: "goldik12",
};
const port = process.env.PORT || 3001;
export const tokenKey = crypto2.randomBytes(256).toString("base64");
const saltRounds = 12;
const myPlaintextPassword = "admin";

/* DB */
const s = process.env.CLEARDB_DATABASE_URL;
const s_proto = s ? s.substring(8) : " ";
export const s_login = s ? s_proto.substring(0, s_proto.indexOf(":")) : "b590467e576f58";
export const s_password = s
	? s_proto.substring(s_proto.indexOf(":") + 1, s_proto.indexOf("@"))
	: "b84b016b";
const url = s ? s_proto.split("@")[1] : " ";
export const urlToConnect = s ? url.substring(0, url.indexOf("/")) : "eu-cdbr-west-01.cleardb.com";
export const dbName = s
	? url.substring(url.indexOf("/") + 1, url.indexOf("?"))
	: "heroku_0772a32464d9340";
/* DB */
