import bcrypt from "bcryptjs";
import AuthToken from "../models/token";
import User from "../models/user";
import { makeid } from "../helpers/functions";
import transport from "../helpers/mailConfig";
import {
  textMessage,
  htmlMessage,
  forgetPasswordHtml,
  forgetPasswordText,
} from "../helpers/messages";

export const updateUserPassword = async (
  userId,
  token,
  newPassword
) => {
  try {
    const authToken = await AuthToken.findOne({
      user: userId,
      token,
    });
    if (authToken) {
      const user = await User.findById(userId);
      if (user) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();
        await authToken.delete();
        return {status: 1, user};
      }
      return {status: 0, message: "user not found"};
    }
    return {status: 0, message: "token has expired"};
  } catch (error) {
    return error;
  }
};

export const findUserByEmail = (email) => {
  const promise = new Promise((resolve, reject) => {
    User.findOne({ email })
      .then((user) => resolve(user))
      .catch((err) => reject(err));
  });
  return promise;
};

export const findUserById = () => {};

export const addAuthtoken = (userId, type) => {
  const promise = new Promise((resolve, reject) => {
    const authToken = new AuthToken({
      type,
      token: makeid(15),
      user: userId,
    });
    authToken
      .save()
      .then((token) => resolve(token))
      .catch((err) => reject(err));
  });
  return promise;
};
export const sendVerifyMessage = (
  name,
  userId,
  verifyToken,
  receiver
) => {
  const url = `${process.env.BASE_URL}/verify?userId=${userId}&token=${verifyToken}`;
  console.log(url)
  const messageConfig = {
    from: process.env.NODEMAILER_USER,
    to: receiver,
    subject: "Welcome to Uncleabbey Blog",
    text: textMessage(name, url),
    html: htmlMessage(name, url),
  };
  const promise = new Promise((resolve, reject) => {
    transport
      .sendMail(messageConfig)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
  return promise;
};
export const sendForgotMessage = (
  name,
  userId,
  verifyToken,
  receiver
) => {
  const url = `${process.env.BASE_URL}/change-password?userId=${userId}&token=${verifyToken.token}`;
  const messageConfig = {
    from: process.env.NODEMAILER_USER,
    to: receiver,
    subject: "Reset Password",
    text: forgetPasswordText(url),
    html: forgetPasswordHtml(url),
  };
  const promise = new Promise((resolve, reject) => {
    transport
      .sendMail(messageConfig)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
  return promise;
};

export const findTokenAndVerify = async (userId, token) => {
  try {
    const authToken = await AuthToken.findOne({
      user: userId,
      token,
    });
    console.log(authToken)
    if (authToken) {
      const user = await User.findById(userId);
      if (user) {
        user.isVerified = true;
        await user.save();
        await authToken.delete();
        return {status: 1, user};
      }
      return {status: 0, message: "user not found"};
    }
    return {status: 0, message: "token has expired"};
    
  } catch (error) {
    return error;
  }
};
