class ApiError {
	constructor(code, message) {
		this.code = code;
		this.message = message;
	}

	static badRequest(msg) {
		return new ApiError (404, msg)
	}
}

module.exports = ApiError;
