const jwt = require("jsonwebtoken");
const config = require("../config/authConfig");

verifyToken = (req, res, next) => {
  console.log(req.cookies);
  let token = req.cookies.token;

  if (!token) {
    return res
      .status(403)
      .send({ success: false, message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ success: false, message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

const authJwt = {
  verifyToken,
};
module.exports = authJwt;
