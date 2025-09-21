const jwt = require("jsonwebtoken");

function authmiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized: Token missing" });
  }

  const token = authHeader.split(" ")[1]; // Extract token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next(); 
  } catch (err) {
    return res.status(403).json({ success: false, message: "Invalid or expired token" });
  }
}

module.exports = authmiddleware;
