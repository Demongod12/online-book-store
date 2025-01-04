const jwt = require("jsonwebtoken");
const User = require("../models/User");

//checks if valid jwt token is provided in the request handler
const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    //Attach the decoded user information to the request
    req.user = decoded;

    next();
  });
};

//admin role check
const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };
