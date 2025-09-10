const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config.js");
const { TokenExpiredError } = jwt;

//const SECRET_KEY = "your_jwt_secret_key_kjm"; // Replace with your env variable

// Middleware to verify JWT and attach user info to req
function authenticateJWT(req, res, next) {
  //const authHeader = req.headers.authorization;

  //if (!authHeader || !authHeader.startsWith('Bearer ')) {
  //  return res.status(401).json({ message: 'No token provided' });
  //}

  //const token = authHeader.split(' ')[1];
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, config.secret);
    req.user = decoded; // decoded should include user info like id and role

    next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return res
        .status(401)
        .send({ message: "Unauthorized! Access Token was expired!" });
    }

    return res.sendStatus(401).send({ message: "Unauthorized!" });
  }
}

// Middleware to check user role(s)
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    console.log("User roles:", req.user);
    //const userRoles = req.user.Roles.map((role) => role.name);
    //const isAllowed = userRoles.some((role) => allowedRoles.includes(role));
    const userRoles = req.user.roles || []; // array dari JWT
    const isAllowed = userRoles.some((role) => allowedRoles.includes(role));

    if (!isAllowed) {
      return res.status(403).json({ message: "Forbidden: insufficient role" });
    }

    // if (!allowedRoles.includes(req.user.role)) {
    //   return res
    //     .status(403)
    //     .json({ message: "Forbidden: insufficient rights" });
    // }

    next();
  };
}

module.exports = {
  authenticateJWT,
  authorizeRoles,
};
