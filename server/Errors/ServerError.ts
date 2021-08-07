class ServerError extends Error {
	code: number;
	constructor(message: string, code: number) {
		super(message);
		this.code = code;
	}
	static internalError(message) {
		return new ServerError(message, 500);
	}
}
export default ServerError;
