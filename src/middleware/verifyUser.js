import { verify } from "jsonwebtoken";
import stripBearerToken from "../helpers/stripBearerToken";

export default (req, res, next) => {
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
    req.user = decoded;
    return next();
  } catch (ex) {
    return next({
      status: 400,
      error: "Invalid token....",
    });
  }
};
