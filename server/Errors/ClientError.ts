class ClientError extends Error {
	code: number;
	constructor(message: string, code: number) {
		super(message);
		this.code = code;
	}
	static badRequest(message: string = "Bad request.") {
		return new ClientError(message, 400);
	}
	static notAuthorizated(message: string = "Not Authorizated.") {
		return new ClientError(message, 401);
	}
	static forbidden(message: string = "Forbidden.") {
		return new ClientError(message, 403);
	}
}
export default ClientError;
