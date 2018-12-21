const config = require('config');
const  jwt = require('jsonwebtoken');

// Authenticating token before giving acesss to content . if invalid returns Invalid token
module.exports = function (req, res, next) {

    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denied ! No token provided'); // Unautharized user

    try{
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded; // we can use user in next middleware bcz user is now property
        next();
    }
    catch(error){
        res.status(400).send('Invalid token..');
    }
      
}