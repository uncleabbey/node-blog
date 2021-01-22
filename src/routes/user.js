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
} from "../controllers/user";

const router = new Router();

router.post("/register", validateUserBody, registerUser);
router.post("/login", validateLoginBody, loginUser);
router.get("/me", verifyUser, getUser);

export default router;
