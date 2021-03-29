const jwt = require('jsonwebtoken')
const jwt_decode = require('jwt-decode');

 const verifyToken = (req, res, next) => {
	 const authHeader = req.headers['authorization']
	 const token = authHeader.split(' ')[1]
	 const decoded = jwt_decode(token);

	 if (token === null) {
	 	return res.send(false)
	 }

	 if(req.body.id !== decoded.id) {
		 return res.send(false)
	 }

	 jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
		 if (err) {
		 	return res.send(false)
		 }
		 req.user = user
		 next()
	 })

};

module.exports = verifyToken
