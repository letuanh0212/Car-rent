import { errorResponse } from "../Utils/response.js";

const requireAdmin = (req, res, next) => {
  if (req.account.role !== "admin") {
    return errorResponse(res, "Admin only", 403);
  }

  next();
};

export default requireAdmin;