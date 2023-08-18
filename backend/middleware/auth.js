const jwt = require('jsonwebtoken')

const auth = (req, res, next)=>{

    // const token = req.cookies.authorization

    const token = req.headers.authorization.split(" ")[1]
    
     console.log(token);
     console.log(req.headers['x-user-id']);
    if(token){
        const decoded = jwt.verify(token, 'murmu')
        if(decoded){
            console.log(decoded);
            delete req.body.token;
            req.body.userId = decoded.userId;
            req.body.userName = decoded.userName;
            next()
        }
        else{
            res.status(200).send("Please Login")
        }
    }
    else{
        res.status(200).send("Please Login")
    }

}

module.exports = {
    auth
}