const jwt = require('jsonwebtoken');

const auth = (req, res, next)=>{
    const token = req.get('Authorization')
    if(!token){
        res.status(401).json({message: 'request without token'});
        return;
    }
    const tokenWithoutBearer = token.split(' ')[1];
    try {
        const decodedToken = jwt.verify(tokenWithoutBearer, process.env.SECRET_JWT);
        req.user = {...decodedToken}
        next();
    } catch (error) {
        res.status(401).json({message: 'unauthorized'})
    }
}

module.exports = auth
