
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config() 

const authenticateUser = async (req, res, next) => {

    const token = req.cookies.accessToken;

    if(!token){
        // No token provided, user is not logged in!
        console.log('Auth token not found!!!')
        return res.status(404).json({ error: 'Auth token not found' })
    }

    try {
        const verifytoken = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = verifytoken.userId
        req.token = token
        console.log('Auth token founded')
        next()
    }
    catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token'})
    }
}


module.exports = authenticateUser