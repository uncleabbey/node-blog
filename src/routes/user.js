import { Router } from "express";
import verifyUser from "../middleware/verifyUser";
import {
  validateUserBody,
  validateLoginBody,
} from "../middleware/validators";
import {
  registerUser,
  loginUser,
  getUser,
  forgetPassword,
  changePassword,
  verifyEmail,
  resendVerification
} from "../controllers/user";

const router = new Router();

router.post("/register", validateUserBody, registerUser);
router.post("/login", validateLoginBody, loginUser);
router.get("/me", verifyUser, getUser);
router.post("/forget-password", forgetPassword);
router.post("/resend-verification", resendVerification);
router.patch("/change-password", changePassword);
router.patch("/verify", verifyEmail);

export default router;
