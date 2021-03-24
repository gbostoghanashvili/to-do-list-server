const ApiError = require('./ApiError')

const errorHandler = (err, req, res, next ) => {

	if (err instanceof ApiError) {
		res.status(err.code).send(err.message)

		return
	}
	res.status(500).send('something went wrong')
}

module.exports = errorHandler;