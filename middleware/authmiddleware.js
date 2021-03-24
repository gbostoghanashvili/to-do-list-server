const jwt = require('jsonwebtoken')

 const verifyToken = (req, res, next) => {
	 const authHeader = req.headers['authorization']
	 const token = authHeader.split(' ')[1]
	 if (token == null) {
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