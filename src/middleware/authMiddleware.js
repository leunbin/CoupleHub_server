require('dotenv').config();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const isAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "No Authentication or invalid token format 😒",
      data: null,
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const userInfo = jwt.verify(token, JWT_SECRET);
    res.locals.user = userInfo;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token 😢",
      data: null,
    });
  }
};

module.exports = {
  isAuth,
};
