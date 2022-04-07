const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
	const auth = req.get("authorization");
	let token;

	if(auth && auth.toLowerCase().startsWith("bearer")) {
		token = auth.substring(7);
	}

	let decodedToken = {};

	try {
		decodedToken = jwt.verify(token, process.env.JWT_SECRET);
	} catch (e) {
		console.warn(e);
	}

	if(!token || !decodedToken.id) {
		return res.status(401).json({ error: "toke is missing or invalid" });
	}

	const { id: userId } = decodedToken;
	req.userId = userId;


	next();
};