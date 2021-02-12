import { verify } from "jsonwebtoken";
import stripBearerToken from "../helpers/stripBearerToken";
import User from "../models/user";

export default async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return next({
      status: 401,
      error: "Access Denied: No token provided...",
    });
  }
  try {
    const strippedToken = stripBearerToken(token);
    const decoded = verify(strippedToken, process.env.SEC_KEY);
    const user = await User.findById(decoded._id);
    if (user) {
      req.user = user;
      return next();
    }
    return next({
      status: 404,
      error: "Sorry User not Found",
    });
  } catch (error) {
    // console.log(error)
    return next({
      status: 400,
      error: "Invalid token....",
    });
  }
};
