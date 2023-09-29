var jwt = require('jsonwebtoken');
const JWT_SECRET = 'sauravranjan';

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');// to get the token from the header (auth token is the name taken in the frontend)
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);// to verify the token
        req.user = data.user;// to get the user from the token
        next();// to move to the next function i.e. the function in which this middleware is used in auth file req and res funtion run first then this middleware then the function in which this middleware is used
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
}

module.exports = fetchuser;
