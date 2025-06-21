import jwt from "jsonwebtoken";
import { JWT_USER_SECRET } from "../config.js";

export function auth(req, res, next) {
  const token = req.headers.token;

  const decodedData = jwt.verify(token, JWT_USER_SECRET);

  if (decodedData) {
    req.userId = decodedData.id;
    next();
  } else {
    res.status(403).json({
      message: "Incorrect credentials",
    });
  }
}
