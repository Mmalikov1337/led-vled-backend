const mysql = require("mysql2");
import { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { urlToConnect, s_login, dbName, s_password } from "./config";
import { IBasket, IDBImage, OrderStatus } from "./types";
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
	async editOrders(
		name: string | null,
		tel: string | null,
		email: string | null,
		cityAddress: string | null,
		houseNumber: string | null,
		houseOrApartment: boolean | null,
		postalCode: string | null,
		promo: string | null,
		instagram: string | null,
		comment: string | null,
		deliveryMethod: string | null,
		status: OrderStatus | null,
		uid: string | null,
		date: Date | null,
		confirmation_url: string | null,
		id: number | null
	) {
		try {
			console.log(
				[
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
				],
				"<<<<<<<asdasdasd"
			);

			await this.pool.execute(
				"UPDATE orders SET " +
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
					"WHERE id = ?",
				[
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
				]
			);
		} catch (e) {
			console.log("Database error. editOrders", e.message, e.type);
			throw ServerError.internalError("Database error.");
		}
	}

	async deleteOrders(id: number): Promise<boolean> {
		try {
			const [rows]: [ResultSetHeader, any] = await this.pool.execute(
				"DELETE FROM orders	WHERE id = ?",
				[id]
			);
			return rows.affectedRows > 0; // rows.affectedRows > 0 => true => успешно;
		} catch (e) {
			throw ServerError.internalError("Database error.");
		}
	}

	async getItems(id?: number) {
		try {
			if (id) {
				const [rows]: [RowDataPacket[], any] = await this.pool.execute(
					`SELECT * FROM items WHERE id = ?`,
					[id]
				);
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

	async editItems(
		name: string | null,
		price: string | null,
		kal: string | null,
		size: string | null,
		rating: string | null,
		description: string | null,
		quantity: number | null,
		image: IDBImage | null,
		id: number | null
	) {
		try {
			const [rows]: [ResultSetHeader, any] = await this.pool.execute(
				"UPDATE items SET " +
					"name = ? , " +
					"price = ? , " +
					"kal = ? , " +
					"size = ? , " +
					"rating = ? , " +
					"description = ? , " +
					"quantity = ? , " +
					"image = ?  " +
					"WHERE id = ?",
				[name, price, kal, size, rating, description, quantity, image, id]
			);
			console.log("rows.affectedRows>>", rows.affectedRows);

			return rows.affectedRows > 0;
		} catch (e) {
			console.log("Database error. editItems", e.message, e.type);
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

	async deleteItems(id: number): Promise<boolean> {
		try {
			const [rows]: [ResultSetHeader, any] = await this.pool.execute(
				"DELETE FROM items	WHERE id = ?",
				[id]
			);
			return rows.affectedRows > 0; // rows.affectedRows > 0 => true => успешно;
		} catch (e) {
			throw ServerError.internalError("Database error.");
		}
	}

	async insertItems(
		name: string | null,
		price: string | null,
		kal: string | null,
		size: string | null,
		rating: string | null,
		description: string | null,
		image: IDBImage | null,
		quantity: number | null
	) {
		try {
			const [rows]: [any, any] = await this.pool.execute(
				`
				INSERT INTO items (
					name,
					price,
					kal,
					size,
					rating,
					description,
					quantity,
					image
				)
				VALUES (
					?,
					?,
					?,
					?,
					?,
					?,
					?,
					?
				)
			`,
				[name, price, kal, size, rating, description, quantity, image]
			);
			console.log(typeof rows, rows);
			return rows.insertId;
		} catch (e) {
			console.log("Database error. insertItems", e.message, e.name);

			throw ServerError.internalError("Database error.");
		}
	}

	async getAdminByName(name) {
		try {
			const [rows] = await this.pool.execute("SELECT * FROM admins WHERE username = ?", [name]);
			return rows;
		} catch (e) {
			console.log("Database error. getAdminByName", e.message, e.name);
			throw ServerError.internalError("Database error.");
		}
	}
}

export default new Database();
