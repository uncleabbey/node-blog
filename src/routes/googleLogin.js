/* eslint-disable no-console */
import { Router } from "express";
import passport from "passport";
import _ from "lodash";
import User from "../models/user";

import successResponse from "../helpers/successResponse";

const router = new Router();
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  async (req, res, next) => {
    console.log(req.user);
    // eslint-disable-next-line no-underscore-dangle
    const { name, email } = req.user._json;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        user = new User({
          name,
          email,
        });
        await user.save();
        const token = user.generateAuthKey();
        const message = "user created successfully";
        const data = {
          token,
          user: _.pick(user, ["_id", "email", "name", "isAdmin"]),
        };
        return successResponse(res, 201, message, data);
      }
      const token = user.generateAuthKey();
      const message = "login was successful";
      const data = {
        token,
        user: _.pick(user, ["_id", "email", "name", "isAdmin"]),
      };
      return successResponse(res, 201, message, data);
    } catch (error) {
      return next({
        status: 500,
        error,
      });
    }
  }
);

export default router;
