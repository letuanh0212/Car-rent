import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { errorResponse } from "../Utils/response.js";

dotenv.config();

const authSystem = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return errorResponse(res, "Unauthorized", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET
    );

    req.account = decoded;

    next();
  } catch (err) {
    return errorResponse(res, "Invalid token", 401);
  }
};

export default authSystem;