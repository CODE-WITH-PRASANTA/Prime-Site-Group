const jwt = require("jsonwebtoken");

const getJwtSecret = () =>
  process.env.JWT_SECRET || "prime_site_group_super_secret_jwt_key_2026";

exports.protectAdmin = (req, res, next) => {
  try {
    let token = "";

    const authHeader = req.headers.authorization || "";
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.slice(7).trim();
    } else if (req.cookies?.adminToken) {
      token = req.cookies.adminToken;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Please log in.",
      });
    }

    const decoded = jwt.verify(token, getJwtSecret());
    if (!decoded || decoded.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Invalid admin session.",
      });
    }

    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message:
        err.name === "TokenExpiredError"
          ? "Session expired. Please log in again."
          : "Invalid or expired token.",
    });
  }
};
