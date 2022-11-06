const jwt = require("jsonwebtoken");
require("dotenv").config();

const Authentication = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.send("Please Login Again");
  }

  const user_token = req.headers.authorization.split(" ")[1];
  jwt.verify(user_token, process.env.jwt_secret_key, (err, decoded) => {
    if (err) {
      return res.send("Please Login Again");
    }
    req.body.email = decoded.email;
    req.body.userId = decoded.userId;
    next();
  });
};

module.exports = Authentication;
