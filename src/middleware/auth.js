const { response } = require("../helper/common");
const jwt = require("jsonwebtoken");

let key = process.env.KEY;

const protect = (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization) {
      let auth = req.headers.authorization;
      token = auth.split(" ")[1];
      let decode = jwt.verify(token, key);
      req.payload = decode;
      next();
    } else {
      return response(res, 400, false, null, "Server need token");
    }
  } catch (err) {
    console.log("error", err);
    if (err && err.name == "JsonWebTokenError") {
      return response(res, 400, false, null, "Invalid token");
    } else if (err && err.name == "TokenExpiredError") {
      return response(res, 400, false, null, "Expired token");
    } else {
      return response(res, 400, false, null, "Token deactivate");
    }
  }
};

const dev_man_adm = (req, res, next) => {
  let token;
  let auth = req.headers.authorization;
  token = auth.split(" ")[1];
  let decode = jwt.verify(token, key);
  let is_dev = decode.is_dev;
  let is_manager = decode.is_manager;
  let is_admin = decode.is_admin;
  if (is_dev !== 1 && is_manager !== 1 && is_admin !== 1) {
    return response(res, 404, false, null, "Role is not admin");
  }
  return next();
};

module.exports = {
  protect,
  dev_man_adm,
};
