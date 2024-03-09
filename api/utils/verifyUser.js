import jwt from "jsonwebtoken";
import { errorHandlerFunc } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorHandlerFunc(401, "Unauthorized"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandlerFunc(403, "Forbidden"));

    req.user = user;
    next();
  });
};
