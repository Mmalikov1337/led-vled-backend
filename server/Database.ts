const mysql = require("mysql2");
import { Pool, RowDataPacket } from "mysql2/promise";
import { urlToConnect, s_login, dbName, s_password } from "./config";
import { IBasket, OrderStatus, PaymentMethod } from "./types";
import ServerError from "./Errors/ServerError";
class Database {
	private pool: Pool;
	constructor() {
		try {
			this.pool = mysql
				.createPool({
					host: urlToConnect,
					user: s_login,
					database: dbName,
					password: s_password,
				})
				.promise();
		} catch (e) {
			console.log(e);
		}
	}
	async insertOrder(
		basket: Array<IBasket>,
		name: string,
		tel: string,
		email: string,
		cityAddress: string,
		houseNumber: string,
		houseOrApartment: boolean,
		postIndex: string,
		promo: string,
		instagram: string,
		comment: string,
		deliveryMethod: number,
		status: OrderStatus
	) {
		try {
			const [rows] = await this.pool.execute(
				`
		INSERT INTO orders (
			basket,
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
			confirmation_url
		)
		VALUES (
			'${JSON.stringify(basket)}',
			'${name}',
			'${tel}',
			'${email}',
			'${cityAddress}',
			'${houseNumber}',
			'${houseOrApartment}',
			'${postIndex}',
			'${promo}',
			'${instagram}',
			'${comment}',
			'${deliveryMethod}',
			'${status}',
			'${null}',
			'${null}',
			'${null}'
		)
	`
			);
			console.log(typeof rows, rows);
		} catch (e) {
			console.log("Database error. insertOrder");

			throw ServerError.internalError("Database error.");
		}
	}
	async getOrders(id?: number): Promise<RowDataPacket[]> {
		try {
			if (id) {
				const [rows]: [RowDataPacket[], any] = await this.pool.execute(
					`SELECT * FROM orders WHERE id = ?`,
					[id]
				);
				return rows;
			} else {
				const [rows]: [RowDataPacket[], any] = await this.pool.execute(`SELECT * FROM orders`);
				return rows;
			}
		} catch (e) {
			console.log("Database error. getOrders");
			throw ServerError.internalError("Database error.");
		}
	}
	async getItems(id?: number) {
		try {
			if (id) {
				const [rows]: [RowDataPacket[], any] = await this.pool.execute(`SELECT * FROM items WHERE id = ?`, [id]);
				return rows;
			} else {
				const [rows]: [RowDataPacket[], any] = await this.pool.execute(`SELECT * FROM items`);
				return rows;
			}
		} catch (e) {
			console.log("Database error. getOrders");
			throw ServerError.internalError("Database error.");
		}
	}
	async executeAny(command: string) {
		try {
			const [rows] = await this.pool.execute(command);
			return rows;
		} catch (e) {
			throw ServerError.internalError("Database error.");
		}
	}
}

export default new Database();
