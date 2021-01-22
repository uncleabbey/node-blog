import passport from "passport";
import dotenv from "dotenv";
import { Strategy } from "passport-google-oauth20";
// import User from "../models/user";

dotenv.config();

const strategy = () => {
  passport.use(
    new Strategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL_GOOGLE,
      },
      (accessToken, refreshToken, profile, cb) => {
        cb(null, profile);
      }
    )
  );
};

export default strategy;
