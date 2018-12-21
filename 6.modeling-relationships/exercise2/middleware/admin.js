module.exports = function (req, res, next) {
    // 401 Unautorized
    // 401 Forbidden
    
    // req.user = req.header() in auth middleware fun. So req.user.isAdmin is directly acessible here
    if(!req.user.isAdmin) return res.status(403).send('You don\'t have right to delete this genra! You are not an admin !');
    next();
}