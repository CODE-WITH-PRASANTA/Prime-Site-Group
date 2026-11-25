const jwt = require("jsonwebtoken");

const getJwtSecret = () =>
  process.env.JWT_SECRET || "prime_site_group_super_secret_jwt_key_2026";

/* POST /api/auth/login */
exports.loginAdmin = (req, res) => {
  const { identifier, userId, email, password } = req.body || {};
  const submittedId = String(identifier || userId || email || "").trim();
  const submittedPass = String(password || "");

  const envUserId = String(process.env.ADMIN_USER_ID || "").trim();
  const envPassword = String(process.env.ADMIN_PASSWORD || "");

  if (!envUserId || !envPassword) {
    return res.status(500).json({
      success: false,
      message: "Admin credentials are not configured on the server.",
    });
  }

  if (
    !submittedId ||
    !submittedPass ||
    submittedId.toLowerCase() !== envUserId.toLowerCase() ||
    submittedPass !== envPassword
  ) {
    return res.status(401).json({
      success: false,
      message: "Invalid User ID or Password.",
    });
  }

  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";
  const token = jwt.sign(
    { userId: envUserId, role: "admin" },
    getJwtSecret(),
    { expiresIn }
  );

  res.cookie("adminToken", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({
    success: true,
    message: "Login successful.",
    token,
    admin: {
      userId: envUserId,
      role: "admin",
    },
  });
};

/* GET /api/auth/me */
exports.verifyAdmin = (req, res) => {
  res.json({
    success: true,
    admin: req.admin,
  });
};

/* POST /api/auth/logout */
exports.logoutAdmin = (_req, res) => {
  res.clearCookie("adminToken", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  res.json({
    success: true,
    message: "Logged out successfully.",
  });
};
