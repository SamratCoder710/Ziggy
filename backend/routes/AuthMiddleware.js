const jwt = require('jsonwebtoken');
module.exports = (req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);        
        next();
    }catch(err){
        console.log(err)
        res.status(401).send('Not authorized - auth');
    }
}