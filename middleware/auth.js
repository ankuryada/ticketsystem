var bearerToken = require('bearer-token')
const user = require("../model/user");
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send({status:false,msg:"A token is required for authentication"});
  }
  try {
    const decoded = jwt.verify(token, process.env.jwt_secret);
    console.log(decoded.id);
    req.user = {id:decoded.id}
    next();
  } catch (err) {
    return res.status(401).json({
      status: false,
      msg: "Invalid token"
    })
  }
}

module.exports = verifyToken;
