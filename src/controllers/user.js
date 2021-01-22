import bcrypt from "bcryptjs";
import _ from "lodash";
import User from "../models/user";
import successResponse from "../helpers/successResponse";

export const getUser = async (req, res, next) => {
  // eslint-disable-next-line prettier/prettier
  const { _id: id } = req.user;
  const user = await User.findOne({ _id: id }).select("-password");
  if (user) {
    const message = "User retrieved successfully";
    return successResponse(res, 200, message, user);
  }
  return next({
    status: 404,
    error: "User does not exist",
  });
};
export const loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next({
        status: 401,
        error: "Invalid email or Password",
      });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return next({
        status: 401,
        error: "Invalid email or Password",
      });
    }
    const token = user.generateAuthKey();
    const data = {
      token,
      user: _.pick(user, ["_id", "email", "name", "isAdmin"]),
    };
    const message = "login was successful";
    return successResponse(res, 201, message, data);
  } catch (error) {
    return next({
      status: 500,
      error,
    });
  }
};
export const registerUser = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return next({ status: 400, error: "User already exist" });
    }
    user = new User(_.pick(req.body, ["name", "email", "password"]));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = user.generateAuthKey();
    const message = "user created successfully";
    const data = {
      token,
      user: _.pick(user, ["_id", "email", "name", "isAdmin"]),
    };
    return successResponse(res, 201, message, data);
  } catch (error) {
    return next({ status: 500, error });
  }
};
