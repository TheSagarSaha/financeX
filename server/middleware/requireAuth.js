const jwt = require("jsonwebtoken")
const Account = require("../models/account")
const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({error: "auth token required"})
    }

    const token = authorization.split(" ")[1]
    try {
        const {_id} = jwt.verify(token, process.env.SECRET)
        
        req.user = await Account.findOne({_id}).select("_id")
        next()

    } catch (error) {
        console.log(error);
        res.status(401).json({error: "req not auth"})
    }
    
}

module.exports = requireAuth