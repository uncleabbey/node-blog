/* eslint-disable no-underscore-dangle */
import bcrypt from "bcryptjs";
import _ from "lodash";
import User from "../models/user";
import successResponse from "../helpers/successResponse";
import {
  addAuthtoken,
  findUserByEmail,
  sendForgotMessage,
  updateUserPassword,
  sendVerifyMessage,
  findTokenAndVerify,
} from "../services/user";

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
    if (!user.isVerified) {
      return next({
        status: 401,
        error: "User has not been verified",
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
      user: _.pick(user, ["_id", "email", "name", "isAdmin", "isVerified"]),
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
    const {email, name, password} = req.body;
    user = new User({name, email: email.toLowerCase(), password});
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const authToken = await addAuthtoken(user._id, "verify");
    await sendVerifyMessage(
      user.name,
      user._id,
      authToken.token,
      user.email
    );
    const message =
      "user created successfully, check your mail for verification details";

    return successResponse(res, 201, message);
  } catch (error) {
    return next({ status: 500, error });
  }
};

export const forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await findUserByEmail(email.toLowerCase());
    if (user) {
      const token = await addAuthtoken(user._id, "forgot");
      await sendForgotMessage(user.name, user._id, token, user.email);
      const message = "check your mail for the next steps"
      return successResponse(res, 201, message);
    }
     return next({ status: 401, error: "Sorry User not found" });
  } catch (error) {
    return next({ status: 500, error });
  }
};
export const resendVerification = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await findUserByEmail(email.toLowerCase());
    if (user) {
      const authToken = await addAuthtoken(user._id, "verify");
      await sendVerifyMessage(
        user.name,
        user._id,
        authToken.token,
        user.email
      );
     return successResponse(res, 200, "Success, Check your mail for next step");
    }
    return next({
      status: 404,
      error: "user not found",
    });
  } catch (error) {
    return next({ status: 500, error });
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { userId, password, token } = req.body;
    const data = await updateUserPassword(userId, token, password);
    if(data.status === 1 && data.user) {
     return successResponse(res, 200, "password changed successfully");
    }
    return  next({ status: 401, error: data.message });
    
  } catch (error) {
    console.log(error)
    return next({ status: 500, error });
  }
};
export const verifyEmail = async (req, res, next) => {
  const { userId, token } = req.query;
  try {
    const data = await findTokenAndVerify(userId, token);
    console.log("ddddd: ", data)
    if(data.status === 1 && data.user) {
      return successResponse(res, 200, "User verified successfully");
    }
    return  next({ status: 401, error: data.message });
  } catch (error) {
    return next({ status: 500, error });
  }
};
