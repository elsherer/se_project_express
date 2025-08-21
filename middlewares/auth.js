const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UNAUTHORIZED } = require("../utils/errors");

const openRoutes = [
  { method: "POST", path: "/signin" },
  { method: "POST", path: "/signup" },
  { method: "GET", path: "/items" },
];

module.exports = (req, res, next) => {
  const normalizedPath =
    req.path.endsWith("/") && req.path.length > 1
      ? req.path.slice(0, -1)
      : req.path;

  const isOpenRoute = openRoutes.some(
    (route) =>
      route.method === req.method && normalizedPath.startsWith(route.path)
  );
  if (isOpenRoute) {
    next();
  }
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(UNAUTHORIZED).json({ message: "Authorization required" });
  }
  const token = authHeader.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    console.log(err.name);
    console.log(err.name);
    res.status(UNAUTHORIZED).json({ message: "Authorization required" });
  }
};
