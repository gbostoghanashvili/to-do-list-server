const User = require('../model/user')
const bcrypt = require('bcrypt')

const checkError = (err, res) => {
	res.send(err.message ? err.message : err);
};

const signUp = (req, res) => {
	const {name, email, password} = req.body

	User.find({email: email}).then(response => {
		if (response.length === 0) {
			new User({name: name, email: email, password: password})
			.save()
			.catch(err => checkError(err, res))
		} else {
			res.send(new Error('user with this email already exists').message)
		}
	})
	.catch(err => checkError(err, res));
}

const fetchUsers = (req, res) => {
	User.find({})
	.then(response => res.send(response))
	.catch(err => checkError(err, res));
}

const logUserIn = (req, res) => {
	const { email, password } = req.body

	User.find({email: email, password: password})
	.then(response => {
		const user = response[0]
		if(user === undefined) {
			res.statusCode = 404

			res.send()
		} else {
			res.send(user._id)
		}
	})
	.catch(err => checkError(err, res));

}

module.exports = {
	signUp,
	logUserIn
}