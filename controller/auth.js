require('dotenv').config();
const User = require('../model/user')
const ApiError = require('../error/ApiError')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const checkError = (err, res) => {
	res.send(err.message ? err.message : err);
};


const signUp = (req, res, next) => {
	const { name, email, password } = req.body


	User.find({ email }).then(response => {
		if (!response.length) {
			new User({ name, email, password})
			.save()
			.catch(err => checkError(err, res))
			res.send()
		} else {
			next(ApiError.badRequest('This email address is already being used'))
		}
	})
	.catch((err) => checkError(err, res));
}


const logUserIn = (req, res, next) => {
	const { email, password } = req.body

	User.find({email, password}).then((r)=> {
		if (!r.length) {
				next(ApiError.badRequest(' The provided credentials are invalid '))
		} else {
			const { _id, email, password } = r;
			const token = jwt.sign({_id, email, password},
					process.env.ACCESS_TOKEN ,
					{expiresIn: '48h'});

			const item = {
						token,
						id: r._id
					}
						res.send(item)
					}
	}).catch(err => checkError(err, res));
}

const check = (req, res) => {
	res.json(true)
}

module.exports = {
	signUp,
	logUserIn,
	check
}