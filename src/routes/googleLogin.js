/* eslint-disable no-console */
import { Router } from "express";
import _ from "lodash";
import User from "../models/user";

import successResponse from "../helpers/successResponse";

const router = new Router();

router.post("/google", async (req, res, next) => {
    const {email, name} = req.body;
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
