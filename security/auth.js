const jwt = require("jsonwebtoken");
const SECRET_KEY = "secretkey123";

function authenticateToken(req, res, next) {
  const token = req.header("x-auth-token")?.split(" ")[1];
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
}

function authorizeRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).send("Access Denied: Inssufficient Permissions");
    }
    next();
  };
}

module.exports = { authenticateToken, authorizeRole };
