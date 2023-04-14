import jwt from "jsonwebtoken";
import { UnAuthenticatedError } from "../errors/index.js";

const auth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    const errObj = new UnAuthenticatedError("Authentication Invalid");
    return res.status(errObj.statusCode).json({ msg : errObj.message });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const testUser = payload.userId === "64387c9e5697298ba77ecba7";
    req.user = { userId: payload.userId, testUser };
    next();
  } catch (error) {
    const errObj = new UnAuthenticatedError("Authentication Invalid");
    return res.status(errObj.statusCode).json({ ...errObj });
  }
};

export default auth;
