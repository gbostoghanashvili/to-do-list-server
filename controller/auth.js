const User = require('../model/user')

const checkError = (err, res) => {
	res.send(err.message ? err.message : err);
};

const signUp = (req, res) => {
	new User({name: req.body.name, email: req.body.email, password: req.body.password})
	.save().then(response => res.send(response))
	.catch(err => checkError(err, res));
}

const fetchUsers = (req, res) => {
	User.find({})
	.then(response => res.send(response))
	.catch(err => checkError(err, res));
}


module.exports = {
	signUp,
	fetchUsers
}